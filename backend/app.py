from fastapi import FastAPI, WebSocket, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.ingestion import ingest_from_url, ingest_pdf, ingest_docx, process_and_store
from backend.langgraph_agent import ask_question

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class FlashcardRequest(BaseModel):
    topic: str

class PlanRequest(BaseModel):
    course_id: str

@app.post("/ingest")
async def ingest(
    file: UploadFile = File(None), url: str = Form(None), doc_id: str = Form(...)
):
    if file:
        content = await file.read()
        text = ingest_pdf(content) if file.filename.endswith(".pdf") else ingest_docx(content)
    elif url:
        text = ingest_from_url(url)
    else:
        return {"error": "No source provided"}
    process_and_store(text, doc_id)
    return {"status": "ingested", "doc_id": doc_id}

@app.websocket("/ws/chat")
async def websocket_chat(ws: WebSocket):
    await ws.accept()
    while True:
        data = await ws.receive_text()
        answer = ask_question(data)
        await ws.send_text(answer)

@app.post("/flashcards")
async def flashcards(req: FlashcardRequest):
    q = f"Generate flashcards for {req.topic}"
    return {"flashcards": ask_question(q)}

@app.post("/plan")
async def plan(req: PlanRequest):
    q = f"Generate a 7-day study plan for course {req.course_id}"
    return {"plan": ask_question(q)}
