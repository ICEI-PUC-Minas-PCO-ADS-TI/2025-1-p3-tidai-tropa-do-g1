import React, { useState } from "react";
import "../styles/InputArea.css";
import Footer from "./Footer";

function InputArea({ onSend }) {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim() === "") return;
    onSend(inputText);
    setInputText(""); // limpa o input
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="input-footer-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Faça uma pergunta..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <Footer />
    </div>
  );
}

export default InputArea;
