import React from "react";

interface ChatBubbleProps {
  message: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => (
  <div style={{ border: "1px solid #ccc", padding: "8px", margin: "4px 0" }}>
    {message}
  </div>
);

export default ChatBubble;
