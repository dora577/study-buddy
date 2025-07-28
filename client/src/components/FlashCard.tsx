import React from "react";

interface FlashCardProps {
  content: string;
}

const FlashCard: React.FC<FlashCardProps> = ({ content }) => (
  <div style={{ border: "1px solid #ccc", padding: "12px", margin: "8px 0" }}>
    {content}
  </div>
);

export default FlashCard;
