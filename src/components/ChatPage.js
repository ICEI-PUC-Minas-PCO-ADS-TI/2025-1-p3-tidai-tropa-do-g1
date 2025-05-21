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

    if (
      lower.includes("segurança documentos pacientes") ||
      lower.includes("acesso equipe") ||
      lower.includes("privacidade informações")
    ) {
      return "A **segurança e privacidade** são prioridades, garantindo que apenas sua equipe autorizada tenha acesso aos documentos.";
    }
    if (lower.includes("funciona") || lower.includes("como usar")) {
      return "Você pode começar fazendo login e subindo seus documentos na área inicial.";
    }

    if (
      lower.includes("chatbot") ||
      lower.includes("inteligência artificial")
    ) {
      return "Nosso sistema possui um chatbot com inteligência artificial onde você pode fazer consultas sobre seu banco de dados e ele retornará as informações contidas nos documentos. O que você gostaria de perguntar ao chatbot?";
    }

    if (lower.includes("oi") || lower.includes("ola")) {
      return "Oi, como posso te ajudar?";
    }

    if (lower.includes("documento") || lower.includes("pdf")) {
      return "Você pode subir arquivos PDF, Word ou imagens escaneadas. Vamos extrair as informações automaticamente!";
    }

    if (lower.includes("erro") || lower.includes("problema")) {
      return "Poxa! Vamos investigar isso. Pode me dar mais detalhes sobre o erro?";
    }

    if (
      lower.includes("organizar documentos anexados") ||
      lower.includes("filtrar documentos") ||
      lower.includes("buscar contratos orçamentos")
    ) {
      return "Nosso sistema permite organizar e filtrar os documentos anexados, facilitando a busca por contratos e orçamentos antigos. Você pode criar categorias e usar filtros. Gostaria de saber mais sobre as opções de organização?";
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
