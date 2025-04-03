import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/main.png" alt="crows-logo" className="logo" />
      </div>

      {/* Formulário de login */}
      <div className="login-form">
        <div className="form-group">
          <label>Login</label>
          <input type="text" placeholder="Código de Login" />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input type="password" placeholder="Senha" />
        </div>

        <div className="form-group">
          <label>Organização</label>
          <input type="text" placeholder="Código da organização" />
        </div>

        <button className="btn-entrar">Entrar</button>
        <button className="btn-cadastro">Não tenho Login</button>
      </div>

      <footer className="rodape">
        <ul>
          <li>
            <a href="#quem-somos">Quem somos nós?</a>
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
    </div>
  );
}

export default Login;
