# Isha Sharma | Portfolio with AI Assistant

A full-stack portfolio with a resume-grounded AI chat assistant.

## Overview
This project combines a modern React portfolio UI with a Python FastAPI backend that uses Retrieval-Augmented Generation (RAG) over `backend/resume.md`.

Users can ask questions about Isha Sharma's resume and receive grounded responses.

## Assignment Requirement Mapping
- Frontend: React + TypeScript (implemented in `frontend/`)
- Backend: Python + FastAPI (implemented in `backend/`)
- Database / Vector Store: FAISS vector store
- Chat Engine: OpenRouter using a free model (`stepfun/step-3.5-flash:free`)

## Features
- Portfolio sections: Hero, About, Skills, Projects, Experience, Education, Contact
- Floating AI chat widget integrated with backend API
- RAG pipeline: load resume -> chunk -> embed -> retrieve -> answer
- Resume-grounded answering with fallback when information is missing
- Responsive UI for desktop and mobile

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Axios
- Backend: FastAPI, LangChain, FAISS, HuggingFace Embeddings
- LLM Provider: OpenRouter free model

## Project Structure
```text
portfolio-ai/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- services/
|   |   `-- App.tsx
|   |-- .env.example
|   `-- package.json
|-- backend/
|   |-- main.py
|   |-- rag.py
|   |-- resume.md
|   |-- requirements.txt
|   `-- .env.example
`-- README.md
```

## Local Setup

### 1) Backend setup
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
# source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env` from `backend/.env.example`:
```env
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=stepfun/step-3.5-flash:free
OPENROUTER_REFERER=http://localhost
OPENROUTER_APP_TITLE=Isha Sharma Portfolio
RETRIEVAL_K=3
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
PORT=8000
```

Run backend:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Health check:
- `GET http://127.0.0.1:8000/health`
- Expected: `{"status":"ok","rag_ready":true}`

### 2) Frontend setup
```bash
cd ../frontend
npm install
```

Create `frontend/.env` from `frontend/.env.example`:
```env
VITE_API_URL=http://localhost:8000
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

Run frontend:
```bash
npm run dev
```

## Demo Questions
- What are Isha's core skills?
- Tell me about the ThinkMate project.
- Has she worked with Node.js?
- What is her educational background?
- How many DSA problems has she solved?
