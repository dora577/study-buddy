import pytest
from fastapi.testclient import TestClient
from backend.app import app

client = TestClient(app)

def test_ingest_no_source():
    response = client.post("/ingest", data={"doc_id": "test"})
    assert response.status_code == 200
    assert response.json() == {"error": "No source provided"}

def test_flashcards_empty_topic(monkeypatch):
    monkeypatch.setattr("backend.langgraph_agent.ask_question", lambda q: "[]")
    response = client.post("/flashcards", json={"topic": ""})
    assert response.status_code == 200
    assert "flashcards" in response.json()

def test_plan_empty_course(monkeypatch):
    monkeypatch.setattr("backend.langgraph_agent.ask_question", lambda q: "{}")
    response = client.post("/plan", json={"course_id": ""})
    assert response.status_code == 200
    assert "plan" in response.json()
