import React, { useState } from "react";
import Chat from "./components/Chat";
import Flashcards from "./components/Flashcards";
import Plan from "./components/Plan";

const App: React.FC = () => {
  const [view, setView] = useState<"chat" | "flashcards" | "plan">("chat");
  return (
    <div>
      <nav>
        <button onClick={() => setView("chat")}>Chat</button>
        <button onClick={() => setView("flashcards")}>Flashcards</button>
        <button onClick={() => setView("plan")}>Study Plan</button>
      </nav>
      {view === "chat" && <Chat />}
      {view === "flashcards" && <Flashcards />}
      {view === "plan" && <Plan />}
    </div>
  );
};

export default App;
