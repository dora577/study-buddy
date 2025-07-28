# RAG-Powered Study Assistant

This project is a study assistant which can:

- Ingest user-supplied course material (PDF, DOCX, plaintext URLs)
- Store and index content in PostgreSQL + pgvector and a Neo4j knowledge graph
- Multi-step RAG via WebSocket chat using LangGraph agents and Graph-RAG
- Flashcard and 7-day study plan generation endpoints
- LangFuse tracing for every agent step
- React + TypeScript front-end
- Deployment configuration for GCP Cloud Run (API) and Cloud Storage + CDN (frontend)

## Development Setup

### API
```bash
cd api
# Copy or create .env with the required variables (e.g. DATABASE_URL, NEO4J_URI, LANGFUSE_API_KEY)
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Tests (CI)
See `.github/workflows/ci.yml` for automated backend and frontend CI setup.
