import React, { useState } from "react";

const Flashcards: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState<string>("");

  const generate = async () => {
    const res = await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setCards(data.flashcards);
  };

  return (
    <div>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Topic"
      />
      <button onClick={generate}>Generate</button>
      <pre>{cards}</pre>
    </div>
  );
};

export default Flashcards;
