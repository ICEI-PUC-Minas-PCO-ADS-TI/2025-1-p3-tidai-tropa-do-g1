import React from "react";
import "../styles/ChatWindow.css";

function ChatWindow({ messages, iaDigitando, userImage }) {
  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <img
              src={msg.sender === "left" ? "/logo_semletra.png" : userImage}
              alt={msg.sender === "left" ? "IA" : "Usuário"}
              className={msg.sender === "left" ? "ia" : "user_chat"}
            />
            <p>{msg.text}</p>
          </div>
        ))}
        {iaDigitando && (
          <div className="message left">
            <img src="/logo_semletra.png" alt="IA" className="ia" />
            <p>
              <i>Digitando...</i>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
