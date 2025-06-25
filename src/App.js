import React from "react";
import Login from "./components/login";
import ChatPage from "./components/ChatPage";
import Register from "./components/register";
import UsuariosPage from "./components/usuariosComponents/UsuariosPage";
import QuemSomos from "./components/quemSomosComponents/QuemSomosPage"; 

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ChatPage" element={<ChatPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="/quemsomos" element={<QuemSomos />} /> 
    </Routes>
  );
}

export default App;
