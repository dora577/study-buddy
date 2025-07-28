import io
import requests
from PyPDF2 import PdfReader
from docx import Document
from backend.database import store_embedding
from backend.graph import driver, add_node, add_edge
from langgraph import LangGraph

def ingest_from_url(url: str) -> str:
    resp = requests.get(url)
    resp.raise_for_status()
    return resp.text

def ingest_pdf(file_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(file_bytes))
    return "\n".join(page.extract_text() or "" for page in reader.pages)

def ingest_docx(file_bytes: bytes) -> str:
    doc = Document(io.BytesIO(file_bytes))
    return "\n".join(p.text for p in doc.paragraphs)

def process_and_store(text: str, doc_id: str):
    lg = LangGraph()
    chunks = lg.text_to_chunks(text)
    for i, chunk in enumerate(chunks):
        emb = lg.embed_text(chunk)
        meta = {"doc_id": doc_id, "chunk_index": i}
        store_embedding(f"{doc_id}_{i}", emb, meta)
        if driver:
            with driver.session() as session:
                session.write_transaction(add_node, f"{doc_id}_{i}", chunk)
