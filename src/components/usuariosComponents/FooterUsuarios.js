// src/components/FooterUsuarios.js
import React from "react";
import "../../styles/stylesUsuarios/FooterUsuarios.css";

function FooterUsuarios() {
  return (
    <footer className="main-footer mt-5 py-3">
      <div className="container text-center">
        <ul className="list-inline mb-0">
          <li className="list-inline-item mx-3">
            <a href="#quem-somos" className="footer-link">Quem somos nós?</a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="#duvidas" className="footer-link">Dúvidas Frequentes</a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="#termos" className="footer-link">Termos de Uso</a>
          </li>
          <li className="list-inline-item mx-3">
            <a href="#contato" className="footer-link">Contato</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default FooterUsuarios;
