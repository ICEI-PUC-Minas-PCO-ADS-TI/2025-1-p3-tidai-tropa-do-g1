// src/components/ChatPage.jsx

import React, { useState, useEffect } from "react"; // Adicionado useEffect
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import TopBar from "./TopBar";
import InputArea from "./InputArea";
import "../styles/ChatPage.css";

// Importe o seu cliente de API (Axios ou fetch wrapper)
// Se você usa Axios e ele está configurado com a base URL do Python, pode usar ele.
// Se não, vamos usar 'fetch' diretamente e definir a URL base aqui.
const API_BASE_URL = 'http://localhost:8000'; // URL do seu backend Python FastAPI

function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "left", text: "Olá! Como posso te ajudar hoje?" },
  ]);
  const [iaDigitando, setIaDigitando] = useState(false);
  const [userImage, setUserImage] = useState("/user.png");

  // 1. Carregar o ID do usuário do localStorage
  const [currentUserId, setCurrentUserId] = useState(null); // Estado para o ID do usuário
  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || '{}');
    if (usuarioLogado && usuarioLogado.id) {
      setCurrentUserId(usuarioLogado.id);
    } else {
      console.warn("ID do usuário não encontrado no localStorage para o ChatPage.");
      // Opcional: redirecionar para login ou exibir mensagem
    }
  }, []); // Executa apenas uma vez ao montar o componente

  const handleSendMessage = async (text) => { // Tornada assíncrona
    // Adiciona a mensagem do usuário imediatamente
    setMessages((prev) => [...prev, { sender: "right", text }]);

    // Validação básica do userId
    if (currentUserId === null) {
      setMessages((prev) => [...prev, { sender: "left", text: "Erro: ID do usuário não disponível. Por favor, faça login novamente." }]);
      return;
    }

    // Indica que a IA está "digitando"
    setIaDigitando(true);

    try {
      // 2. Fazer a requisição para a API Python do chatbot
      const response = await fetch(`${API_BASE_URL}/chatbot/query/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // A API FastAPI espera JSON
        },
        body: JSON.stringify({ // Envia os dados como JSON
          query: text,
          user_id: currentUserId,
        }),
      });

      const result = await response.json(); // Lida com a resposta JSON

      if (response.ok) { // Requisição bem-sucedida (status 2xx)
        setMessages((prev) => [...prev, { sender: "left", text: result.response }]);
      } else { // Requisição com erro (status 4xx, 5xx)
        console.error("Erro na resposta da API do chatbot:", result.detail || result.message);
        setMessages((prev) => [...prev, { sender: "left", text: `Desculpe, ocorreu um erro ao processar sua pergunta: ${result.detail || 'Erro desconhecido.'}` }]);
      }
    } catch (error) {
      // Erro de rede ou na requisição fetch (ex: CORS)
      console.error("Erro de rede ao chamar o chatbot:", error);
      setMessages((prev) => [...prev, { sender: "left", text: "Desculpe, não consegui me conectar ao serviço de chatbot. Por favor, tente novamente mais tarde." }]);
    } finally {
      setIaDigitando(false); // Remove o indicador de digitação da IA
    }
  };

  // Remover a função RespostaFake, ela não será mais usada
  /*
  const RespostaFake = (input) => { ... }; 
  */

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
        {/* Passa o handleSendMessage para o InputArea */}
        <InputArea onSend={handleSendMessage} /> 
      </div>
    </div>
  );
}

export default ChatPage;