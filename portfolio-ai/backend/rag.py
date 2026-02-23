import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"), override=True)


RESUME_PATH = os.path.join(os.path.dirname(__file__), "resume.md")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "mistralai/mistral-7b-instruct:free")
OPENROUTER_REFERER = os.getenv("OPENROUTER_REFERER", "http://localhost")
OPENROUTER_APP_TITLE = os.getenv("OPENROUTER_APP_TITLE", "Isha Sharma Portfolio")
RETRIEVAL_K = int(os.getenv("RETRIEVAL_K", "3"))


SYSTEM_PROMPT = """You are an AI assistant for Isha Sharma's portfolio.
Answer ONLY using the provided resume context.
If the answer is not present in the context, politely say you don't have that information.
Keep responses professional, concise, and helpful.

Context:
{context}

Question: {question}
Answer:"""


class RAGManager:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.vector_store = None
        self.qa_chain = None
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
            loader = TextLoader(RESUME_PATH, encoding="utf-8")
            documents = loader.load()

            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=600,
                chunk_overlap=100,
            )
            chunks = text_splitter.split_documents(documents)
            self.vector_store = FAISS.from_documents(chunks, self.embeddings)

            llm = ChatOpenAI(
                openai_api_key=OPENROUTER_API_KEY,
                openai_api_base="https://openrouter.ai/api/v1",
                model_name=OPENROUTER_MODEL,
                default_headers={
                    "HTTP-Referer": OPENROUTER_REFERER,
                    "X-Title": OPENROUTER_APP_TITLE,
                },
            )

            prompt = PromptTemplate(
                template=SYSTEM_PROMPT,
                input_variables=["context", "question"],
            )

            self.qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                chain_type="stuff",
                retriever=self.vector_store.as_retriever(search_kwargs={"k": RETRIEVAL_K}),
                chain_type_kwargs={"prompt": prompt},
            )
            self.initialization_error = None
        except Exception as exc:
            self.initialization_error = f"Failed to initialize RAG system: {exc}"

    def ask(self, query: str) -> str:
        clean_query = query.strip()
        if not clean_query:
            raise ValueError("Message cannot be empty")

        if self.initialization_error or not self.qa_chain:
            raise RuntimeError(self.initialization_error or "RAG system is not initialized")

        try:
            response = self.qa_chain.invoke({"query": clean_query})
            result = response.get("result", "").strip()
            if not result:
                raise RuntimeError("Received an empty response from the model")
            return result
        except RuntimeError:
            raise
        except Exception as exc:
            raise RuntimeError("Failed to generate AI response") from exc

    def is_ready(self) -> bool:
        return self.qa_chain is not None and self.initialization_error is None


rag_manager = RAGManager()
