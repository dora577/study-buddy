import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from pgvector.sqlalchemy import Vector
from dotenv import load_dotenv

load_dotenv()
_DATABASE_URL = os.getenv("DATABASE_URL")
if _DATABASE_URL:
    engine = create_engine(_DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
else:
    engine = None  # type: ignore
    SessionLocal = None  # type: ignore

def store_embedding(id: str, embedding: list[float], metadata: dict):
    with engine.connect() as conn:
        conn.execute(
            text("INSERT INTO documents(id, embedding, metadata) VALUES (:id, :embedding, :metadata)"),
            {"id": id, "embedding": embedding, "metadata": metadata},
        )
        conn.commit()
