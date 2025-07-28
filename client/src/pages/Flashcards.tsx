import React, { useState } from "react";
import { getFlashcards } from "../api";
import FlashCard from "../components/FlashCard";

const Flashcards: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState<string[]>([]);

  const generate = async () => {
    const data = await getFlashcards(topic);
    setCards(data.flashcards || []);
  };

  return (
    <div>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Topic"
      />
      <button onClick={generate}>Generate</button>
      <div>
        {cards.map((c, i) => (
          <FlashCard key={i} content={c} />
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
