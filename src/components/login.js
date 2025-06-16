import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { loginUser } from "../front/loginFuncs";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [organizacao, setOrganizacao] = useState("");

  const handleLoginClick = async () => {
    const sucesso = await loginUser(
      login.trim().toLowerCase(),
      senha,
      organizacao.trim().toLowerCase()
    );
    if (sucesso) {
      navigate("/ChatPage");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/main.png" alt="crows-logo" className="logo" />
      </div>

      <div className="login-form">
        <div className="form-group">
          <label>Login</label>
          <input
            type="text"
            placeholder="Código de Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Organização</label>
          <input
            type="text"
            placeholder="Código da organização"
            value={organizacao}
            onChange={(e) => setOrganizacao(e.target.value)}
          />
        </div>

        <button className="btn-entrar" onClick={handleLoginClick}>
          Entrar
        </button>
        <button className="btn-cadastro" onClick={handleRegisterClick}>
          Não tenho Login
        </button>
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
