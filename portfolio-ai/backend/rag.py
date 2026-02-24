import os
import re
from typing import List, Tuple

import requests
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"), override=True)


RESUME_PATH = os.path.join(os.path.dirname(__file__), "resume.md")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "stepfun/step-3.5-flash:free")
OPENROUTER_REFERER = os.getenv("OPENROUTER_REFERER", "http://localhost")
OPENROUTER_APP_TITLE = os.getenv("OPENROUTER_APP_TITLE", "Isha Sharma Portfolio")
RETRIEVAL_K = int(os.getenv("RETRIEVAL_K", "5"))

SYSTEM_PROMPT = """You are an AI assistant for Isha Sharma's portfolio.
Answer ONLY using the provided resume context.
If the answer is not present in the context, politely say you don't have that information.
Keep responses professional, concise, and helpful.
When asked about projects, provide project names and key points from context."""

PROJECT_KEYWORDS = {"thinkmate", "stocksphere", "livelink", "project", "projects"}


class RAGManager:
    def __init__(self):
        self.chunks: List[str] = []
        self.initialization_error = None
        self.initialize_rag()

    def initialize_rag(self):
        if not os.path.exists(RESUME_PATH):
            self.initialization_error = f"Resume file not found at {RESUME_PATH}."
            return

        if not OPENROUTER_API_KEY:
            self.initialization_error = "OPENROUTER_API_KEY is missing."
            return

        try:
            with open(RESUME_PATH, "r", encoding="utf-8") as f:
                text = f.read()

            self.chunks = self._chunk_text(text, chunk_size=900, overlap=150)
            if not self.chunks:
                self.initialization_error = "No resume content available for retrieval."
                return

            self.initialization_error = None
        except Exception as exc:
            self.initialization_error = f"Failed to initialize RAG system: {exc}"

    def _normalize(self, text: str) -> str:
        text = text.lower()
        replacements = {
            "think mate": "thinkmate",
            "stock sphere": "stocksphere",
            "live link": "livelink",
        }
        for src, dst in replacements.items():
            text = text.replace(src, dst)
        return text

    def _chunk_text(self, text: str, chunk_size: int, overlap: int) -> List[str]:
        cleaned = re.sub(r"\n{3,}", "\n\n", text).strip()
        if not cleaned:
            return []

        # Prefer semantic split first by headings to keep project blocks intact.
        sections = re.split(r"\n(?=##+\s)", cleaned)
        chunked: List[str] = []
        for sec in sections:
            sec = sec.strip()
            if not sec:
                continue
            if len(sec) <= chunk_size:
                chunked.append(sec)
                continue

            start = 0
            while start < len(sec):
                end = min(start + chunk_size, len(sec))
                chunked.append(sec[start:end])
                if end == len(sec):
                    break
                start = max(0, end - overlap)

        return chunked

    def _tokenize(self, text: str) -> set:
        normalized = self._normalize(text)
        tokens = set(re.findall(r"[a-zA-Z0-9+#.-]+", normalized))
        return {t for t in tokens if len(t) > 1}

    def _score_chunk(self, query: str, chunk: str) -> int:
        q_norm = self._normalize(query)
        c_norm = self._normalize(chunk)
        q_tokens = self._tokenize(q_norm)
        c_tokens = self._tokenize(c_norm)

        overlap_score = len(q_tokens & c_tokens)
        phrase_score = 0

        # Phrase / entity boosting for project queries.
        for key in PROJECT_KEYWORDS:
            if key in q_tokens and key in c_norm:
                phrase_score += 4

        # Boost exact entity mention from user query.
        for token in q_tokens:
            if len(token) > 3 and token in c_norm:
                phrase_score += 1

        # Mild heading boost for project-related asks.
        if (q_tokens & PROJECT_KEYWORDS) and ("## projects" in c_norm or "###" in c_norm):
            phrase_score += 2

        return overlap_score + phrase_score

    def _retrieve(self, query: str, k: int) -> List[str]:
        scored: List[Tuple[int, str]] = []
        for chunk in self.chunks:
            score = self._score_chunk(query, chunk)
            if score > 0:
                scored.append((score, chunk))

        scored.sort(key=lambda x: x[0], reverse=True)
        top = [chunk for _, chunk in scored[:k]]

        # Fallback: if user asks project questions, include any project chunk if ranking missed it.
        q_tokens = self._tokenize(query)
        if (q_tokens & PROJECT_KEYWORDS) and not any("thinkmate" in self._normalize(c) or "stocksphere" in self._normalize(c) or "livelink" in self._normalize(c) for c in top):
            project_chunks = [c for c in self.chunks if "projects" in self._normalize(c) or "thinkmate" in self._normalize(c) or "stocksphere" in self._normalize(c) or "livelink" in self._normalize(c)]
            top.extend(project_chunks[: max(0, k - len(top))])

        # Preserve order and dedupe.
        deduped = []
        seen = set()
        for c in top:
            if c not in seen:
                deduped.append(c)
                seen.add(c)
        return deduped[:k]

    def _call_openrouter(self, prompt: str) -> str:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": OPENROUTER_REFERER,
            "X-Title": OPENROUTER_APP_TITLE,
        }
        payload = {
            "model": OPENROUTER_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.1,
        }

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=60,
        )

        if response.status_code != 200:
            try:
                error_message = response.json().get("error", {}).get("message", response.text)
            except Exception:
                error_message = response.text
            raise RuntimeError(f"OpenRouter request failed: {error_message}")

        data = response.json()
        choices = data.get("choices", [])
        if not choices:
            raise RuntimeError("OpenRouter returned no choices")

        content = choices[0].get("message", {}).get("content", "").strip()
        if not content:
            raise RuntimeError("OpenRouter returned empty content")
        return content

    def ask(self, query: str) -> str:
        clean_query = query.strip()
        if not clean_query:
            raise ValueError("Message cannot be empty")

        if self.initialization_error or not self.chunks:
            raise RuntimeError(self.initialization_error or "RAG system is not initialized")

        try:
            context_chunks = self._retrieve(clean_query, RETRIEVAL_K)
            if not context_chunks:
                return "I don't have that information in the provided resume context."

            context = "\n\n---\n\n".join(context_chunks)
            prompt = (
                f"Context:\n{context}\n\n"
                f"Question: {clean_query}\n\n"
                "Answer using only context. If asked about projects, list relevant project names and key details from context."
            )
            return self._call_openrouter(prompt)
        except RuntimeError:
            raise
        except Exception as exc:
            raise RuntimeError("Failed to generate AI response") from exc

    def is_ready(self) -> bool:
        return bool(self.chunks) and self.initialization_error is None


rag_manager = RAGManager()
