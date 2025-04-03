import React from "react";
import "../styles/ChatWindow.css";

function ChatWindow() {
  return (
    <div className="chat-window">
      {/* Área com as mensagens */}
      <div className="messages-container">
        <div className="message left">
          <img src="/logo_semletra.png" alt="IA" className="ia" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
            lorem tortor. Suspendisse eget tristique sapien.
          </p>
        </div>

        <div className="message right">
          <img src="/user.png" alt="Usuário" className="user_chat" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac
            dignissim nisl. Mauris vel diam dui.
          </p>
        </div>

        <div className="message left">
          <img src="/logo_semletra.png" alt="IA" className="ia" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
