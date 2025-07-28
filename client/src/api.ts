export async function ingest({ file, url, docId }: { file: File | null; url: string; docId: string }) {
  const formData = new FormData();
  if (file) formData.append("file", file);
  if (url) formData.append("url", url);
  formData.append("doc_id", docId);
  const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/ingest`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export function createWebSocket(): WebSocket {
  const url = import.meta.env.VITE_API_WS || "ws://localhost:8000";
  return new WebSocket(`${url}/ws/chat`);
}

export async function getFlashcards(topic: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/flashcards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  return res.json();
}

export async function getPlan(courseId: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course_id: courseId }),
  });
  return res.json();
}
