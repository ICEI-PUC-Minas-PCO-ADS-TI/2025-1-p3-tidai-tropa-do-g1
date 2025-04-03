import React from "react";
import "../styles/InputArea.css";
import Footer from "./Footer";

function InputArea() {
  return (
    <div className="input-footer-container">
      <div className="input-container">
        <input type="text" placeholder="Faça uma pergunta..." />
      </div>
      <Footer />
    </div>
  );
}

export default InputArea;
