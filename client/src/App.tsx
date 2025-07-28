import React, { useState } from "react";
import Chat from "./pages/Chat";
import Flashcards from "./pages/Flashcards";
import Upload from "./pages/Upload";

const App: React.FC = () => {
  const [view, setView] = useState<"chat" | "flashcards" | "upload">("chat");
  return (
    <div>
      <nav>
        <button onClick={() => setView("chat")}>Chat</button>
        <button onClick={() => setView("flashcards")}>Flashcards</button>
        <button onClick={() => setView("upload")}>Upload</button>
      </nav>
      {view === "chat" && <Chat />}
      {view === "flashcards" && <Flashcards />}
      {view === "upload" && <Upload />}
    </div>
  );
};

export default App;
