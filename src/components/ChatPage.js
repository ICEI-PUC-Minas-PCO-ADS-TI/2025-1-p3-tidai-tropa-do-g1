import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import TopBar from "./TopBar";
import InputArea from "./InputArea";
import "../styles/ChatPage.css";

function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "left", text: "Olá! Como posso te ajudar hoje?" },
  ]);
  const [iaDigitando, setIaDigitando] = useState(false);
  const [userImage, setUserImage] = useState("/user.png");

  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "right", text }]);

    // Simulação da resposta da IA
    setIaDigitando(true);

    setTimeout(() => {
      const fakeResponse = RespostaFake(text);
      setMessages((prev) => [...prev, { sender: "left", text: fakeResponse }]);
      setIaDigitando(false);
    }, 1000);
  };

  const RespostaFake = (input) => {
    const lower = input.toLowerCase();

    if (lower.includes("Preço") || lower.includes("Valor")) {
      return "Nosso sistema oferece planos a partir de R$49,90 mensais.";
    }
    if (lower.includes("funciona") || lower.includes("como usar")) {
      return "Você pode começar fazendo login e subindo seus documentos na área inicial.";
    }

    if (lower.includes("documento") || lower.includes("pdf")) {
      return "Você pode subir arquivos PDF, Word ou imagens escaneadas. Vamos extrair as informações automaticamente!";
    }

    if (lower.includes("erro") || lower.includes("problema")) {
      return "Poxa! Vamos investigar isso. Pode me dar mais detalhes sobre o erro?";
    }

    //Resposta padrão
    const respostasDefault = [
      "Entendi! Estou analisando isso.",
      "Certo, me dê um momento...",
      "Ótimo ponto! Deixe-me verificar.",
      "Interessante! Vou buscar essa informação.",
    ];
    return respostasDefault[
      Math.floor(Math.random() * respostasDefault.length)
    ];
  };

  return (
    <div className="chat-page">
      <Sidebar setUserImage={setUserImage} userImage={userImage} />
      <div className="main-content">
        <TopBar />
        <ChatWindow
          messages={messages}
          iaDigitando={iaDigitando}
          userImage={userImage}
        />
        <InputArea onSend={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
