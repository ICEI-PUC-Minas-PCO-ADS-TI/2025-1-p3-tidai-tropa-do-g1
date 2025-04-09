import React from "react";
import Login from "./components/login";
import ChatPage from "./components/ChatPage";
import Register from "./components/register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ChatPage" element={<ChatPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;