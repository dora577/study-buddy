import React, { useState, useEffect, useRef } from "react";
import { createWebSocket } from "../api";
import ChatBubble from "../components/ChatBubble";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    const ws = createWebSocket();
    wsRef.current = ws;
    ws.onmessage = (e) => setMessages((m) => [...m, `Bot: ${e.data}`]);
    return () => ws.close();
  }, []);

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
      <div style={{ height: 300, overflowY: "auto" }}>
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
