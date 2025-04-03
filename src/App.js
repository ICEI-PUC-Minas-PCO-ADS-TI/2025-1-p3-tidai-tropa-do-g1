import React from "react";
import Login from "./components/login";
import ChatPage from "./components/ChatPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ChatPage" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
