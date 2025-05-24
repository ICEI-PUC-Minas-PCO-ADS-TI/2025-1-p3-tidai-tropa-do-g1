import React from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { handleRegisterClick } from "../front/registerFuncs";

function Register() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="register-container">
      <div className="logo-container">
        <img src="/main.png" alt="crows-logo" className="logo" />
      </div>

      {/* Formulário de registro - agora sem o quadrado cinza */}
      <div className="register-content">
        <div className="register-form">          
          {/* Primeira linha: Nome e Organização */}
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" placeholder="Nome" />
            </div>

            <div className="form-group">
              <label>Organização</label>
              <input type="text" placeholder="Nome da Organização" />
            </div>
          </div>

          {/* Segunda linha: CNPJ, CPF e Telefone */}
          <div className="form-row">
            <div className="form-group">
              <label>CNPJ</label>
              <input type="text" placeholder="CNPJ" />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input type="text" placeholder="+55" />
            </div>

            <div className="form-group">
              <label>CPF</label>
              <input type="text" placeholder="CPF" />
            </div>
          </div>

          {/* Terceira linha: E-mail e Confirmação de e-mail */}
          <div className="form-row">
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" placeholder="email@dominio.com" />
            </div>

            <div className="form-group">
              <label>Confirmação de e-mail</label>
              <input type="email" placeholder="email@dominio.com" />
            </div>
          </div>

          {/* Quarta linha: Senha e Confirmação de senha */}
          <div className="form-row password-row">
            <div className="form-group form-group-password">
              <label>Senha</label>
              <input type="password" placeholder="Senha" />
            </div>

            <div className="form-group form-group-password">
              <label>Confirmação de senha</label>
              <input type="password" placeholder="Senha" />
            </div>
            
            {/* Elemento vazio para equalizar o espaço como na linha CNPJ/CPF/Telefone */}
            <div className="form-group-spacer"></div>
          </div>

          <button className="btn-cadastrar" onClick={handleRegisterClick}>Cadastrar</button>
          
          <div className="login-link">
            <p>Já tem uma conta? <a onClick={handleLoginClick}>Faça login</a></p>
          </div>
        </div>
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

export default Register;