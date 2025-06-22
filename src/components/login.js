import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { loginUser } from "../front/loginFuncs";

function Login() {
  const navigate = useNavigate();

  // Renomeado 'login' para 'email' para maior clareza
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [organizacao, setOrganizacao] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Usando um formulário, prevenimos o reload
    setError("");
    setIsLoading(true);

    try {
      await loginUser({ email, senha, organizacao });
      navigate("/ChatPage"); // Navega para a página principal após sucesso
    } catch (err) {
      setError(err.message); // Exibe o erro retornado pelo authService
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

      {/* Usar a tag <form> é uma boa prática para acessibilidade */}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>E-mail de Login</label>
          <input
            type="email" // Alterado para type="email"
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
            placeholder="Código ou nome da organização"
            value={organizacao}
            onChange={(e) => setOrganizacao(e.target.value)}
            required
          />
        </div>

        {/* Exibe mensagens de erro para o usuário */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-entrar" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        <button type="button" className="btn-cadastro" onClick={handleRegisterClick}>
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
