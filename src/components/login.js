import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { loginUser } from "../front/loginFuncs";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [organizacao, setOrganizacao] = useState("");
  const [tipoLogin, setTipoLogin] = useState("usuario");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await loginUser({ email, senha, organizacao, tipoLogin });
      navigate("/ChatPage");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>E-mail de Login</label>
          <input
            type="email"
            placeholder="seu-email@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Organização</label>
          <input
            type="text"
            placeholder="Nome da organização"
            value={organizacao}
            onChange={(e) => setOrganizacao(e.target.value)}
            required
          />
        </div>

        <div className="radio-group">
          <label>Tipo de Login:</label>
          <div>
            <label>
              <input
                type="radio"
                value="usuario"
                checked={tipoLogin === "usuario"}
                onChange={() => setTipoLogin("usuario")}
              />
              Usuário
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                value="admin"
                checked={tipoLogin === "admin"}
                onChange={() => setTipoLogin("admin")}
              />
              Administrador
            </label>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-entrar" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        <button
          type="button"
          className="btn-cadastro"
          onClick={handleRegisterClick}
        >
          Não tenho Login
        </button>
      </form>

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
