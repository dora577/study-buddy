import os
from langgraph import LangGraph
from langgraph.agents import GraphRAGAgent
from langfuse import LanguageTracer
from dotenv import load_dotenv

load_dotenv()
_LF_KEY = os.getenv("LANGFUSE_API_KEY", "")
try:
    tracer = LanguageTracer(_LF_KEY)
    lg = LangGraph()
    agent = GraphRAGAgent(lg, tracer=tracer)
except Exception:
    agent = None  # type: ignore

def ask_question(query: str) -> str:
    if agent:
        return agent.run(query)
    return ""
