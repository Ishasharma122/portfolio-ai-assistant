# Isha Sharma | Portfolio with AI Assistant

A full-stack portfolio with a resume-grounded AI chat assistant.

## Overview
This project combines a React + TypeScript frontend with a Python FastAPI backend.
The chatbot answers resume questions using lightweight retrieval over `portfolio-ai/backend/resume.md` and generates responses through OpenRouter.

## Assignment Requirement Mapping
- Frontend: React + TypeScript (`portfolio-ai/frontend`)
- Backend: Python + FastAPI (`portfolio-ai/backend`)
- Retrieval Layer: In-memory chunk index (lightweight RAG-style retrieval)
- Chat Engine: OpenRouter with a free model (`stepfun/step-3.5-flash:free`)

## Features
- Modern portfolio UI sections: About, Skills, Projects, Experience, Education, Contact
- Floating AI chat widget
- Resume-grounded responses with refusal for missing context
- Responsive design for desktop and mobile

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Axios
- Backend: FastAPI, Requests, Python-dotenv
- LLM Provider: OpenRouter (free model)

## Project Structure
```text
repo-root/
|-- README.md
`-- portfolio-ai/
    |-- frontend/
    |   |-- src/
    |   |-- .env.example
    |   `-- package.json
    `-- backend/
        |-- main.py
        |-- rag.py
        |-- resume.md
        |-- requirements.txt
        `-- .env.example
```

## Local Setup

### 1) Backend
```bash
cd portfolio-ai/backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
# source venv/bin/activate
pip install -r requirements.txt
```

Create `portfolio-ai/backend/.env` from `.env.example`:
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
- `http://127.0.0.1:8000/health`
- Expected: `{"status":"ok","rag_ready":true}`

### 2) Frontend
```bash
cd portfolio-ai/frontend
npm install
```

Create `portfolio-ai/frontend/.env` from `.env.example`:
```env
VITE_API_URL=http://localhost:8000
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

Run frontend:
```bash
npm run dev
```

Open:
- `http://localhost:5173`

## Demo Questions
- What are Isha's core skills?
- Tell me about the ThinkMate project.
- Has she worked with Node.js?
- What is her educational background?
- How many DSA problems has she solved?

## Deployment (Render + Vercel)

### Backend (Render)
- Root Directory: `portfolio-ai/backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Add env vars from `backend/.env.example`
- Set `PYTHON_VERSION=3.11.11`

### Frontend (Vercel)
- Root Directory: `portfolio-ai/frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Env vars:
  - `VITE_API_URL=https://<your-render-backend-url>`
  - `VITE_WEB3FORMS_KEY=<your_key>`

After frontend deploy, update backend env:
- `OPENROUTER_REFERER=https://<your-vercel-url>`
- `ALLOWED_ORIGINS=https://<your-vercel-url>`

## Security Notes
- Never commit real `.env` files.
- Keep secrets only in deployment env settings/local `.env`.
- Rotate keys if exposed.
