# RAG-Powered Study Assistant

This project is a study assistant which can:

- Ingest of user-supplied course material (PDF, DOCX, plaintext URLs)
- Storr and index in PostgreSQL + pgvector and a Neo4j knowledge graph
- Multi-step RAG via WebSocket chat using LangGraph agents and Graph-RAG
- Flashcard and 7-day study plan generation endpoints
- LangFuse tracing for every agent step
- React + TypeScript front-end
- Deployment configuration for GCP Cloud Run (backend) and Cloud Storage + CDN (frontend)

## Development Setup

### Backend
```bash
cd backend
cp .env.example .env
# Fill in environment variables in .env
pip install -r requirements.txt
uvicorn backend.app:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Tests (CI)
See `.github/workflows/ci.yml` for automated backend and frontend CI setup.
