import React, { useState, useEffect, useRef } from "react";
import { createWebSocket } from "../api";
import ChatBubble from "../components/ChatBubble";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket>();
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ws = createWebSocket();
    wsRef.current = ws;
    ws.onmessage = (e) => setMessages((m) => [...m, `Bot: ${e.data}`]);
    return () => ws.close();
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
          <ChatBubble key={i} message={m} />
        ))}
      </div>
      <input ref={inputRef} />
      <button onClick={send}>Send</button>
    </div>
  );
};

export default Chat;
