import os
from neo4j import GraphDatabase
from dotenv import load_dotenv

load_dotenv()
_NEO4J_URI = os.getenv("NEO4J_URI")
if _NEO4J_URI:
    driver = GraphDatabase.driver(
        _NEO4J_URI,
        auth=(os.getenv("NEO4J_USER"), os.getenv("NEO4J_PASSWORD")),
    )
else:
    driver = None  # type: ignore

def add_node(tx, node_id: str, content: str):
    tx.run(
        "MERGE (d:Document {id: $node_id}) SET d.content = $content",
        node_id=node_id,
        content=content,
    )

def add_edge(tx, source: str, target: str, relation: str):
    tx.run(
        "MATCH (a:Document {id: $source}), (b:Document {id: $target})"
        " MERGE (a)-[:RELATED {relation: $relation}]->(b)",
        source=source,
        target=target,
        relation=relation,
    )
