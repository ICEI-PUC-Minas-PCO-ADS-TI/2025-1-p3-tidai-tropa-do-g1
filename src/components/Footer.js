import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <ul>
        <li>
          <Link to="/quemsomos">Quem somos nós?</Link>
        </li>
        <li>
          <a href="#duvidas">Dúvidas Frequentes</a>
        </li>
        <li>
          <a href="#termos">Termos de Uso</a>
        </li>
        <li>
          <a href="#contato">Contato</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
