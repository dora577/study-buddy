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

### API
```bash
cd api/app
# Copy or create .env with the required variables (e.g. DATABASE_URL, NEO4J_URI, LANGFUSE_API_KEY)
pip install -r requirements.txt
uvicorn main:app --reload
```

### Client
```bash
cd client
npm install
npm run dev
```

## Tests (CI)
See `.github/workflows/ci.yml` for automated backend and frontend CI setup.
