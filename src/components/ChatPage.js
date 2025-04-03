import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import TopBar from "./TopBar";
import InputArea from "./InputArea";
import "../styles/ChatPage.css";

function ChatPage() {
  return (
    <div className="chat-page">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <ChatWindow />
        <InputArea />
      </div>
      <div className="rodape"></div>
    </div>
  );
}

export default ChatPage;
