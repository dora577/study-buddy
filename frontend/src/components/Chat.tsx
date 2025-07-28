import React, { useState, useEffect, useRef } from "react";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket>();
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_WS || "ws://localhost:8000"}/ws/chat`;
    wsRef.current = new WebSocket(url);
    wsRef.current.onmessage = (e) =>
      setMessages((m) => [...m, `Bot: ${e.data}`]);
    return () => wsRef.current?.close();
  }, []);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const send = () => {
    const text = inputRef.current?.value;
    if (text) {
      setMessages((m) => [...m, `You: ${text}`]);
      wsRef.current?.send(text);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div ref={messagesRef} style={{ height: 300, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <input ref={inputRef} />
      <button onClick={send}>Send</button>
    </div>
  );
};

export default Chat;
