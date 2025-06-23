import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarOrganizacao } from "../front/registerFuncs.js";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomeUsuario: "",
    nomeOrganizacao: "",
    cnpj: "",
    telefone: "",
    cpf: "",
    ramo: "",
    cep: "",
    dataNascimento: "",
    email: "",
    confirmEmail: "",
    senha: "",
    confirmSenha: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.email !== formData.confirmEmail) {
      setError("Os e-mails não coincidem.");
      return;
    }
    if (formData.senha !== formData.confirmSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      await registrarOrganizacao(formData);
      alert(
        "Organização cadastrada com sucesso! Você será redirecionado para o login."
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="register-container">
      <div className="logo-container">
        <img src="/main.png" alt="crows-logo" className="logo" />
      </div>

      <div className="register-content">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nome do Responsável</label>
              <input
                type="text"
                name="nomeUsuario"
                placeholder="Seu nome completo"
                value={formData.nomeUsuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Nome da Organização</label>
              <input
                type="text"
                name="nomeOrganizacao"
                placeholder="Nome da sua empresa"
                value={formData.nomeOrganizacao}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>CNPJ</label>
              <input
                type="text"
                name="cnpj"
                placeholder="00.000.000/0001-00"
                value={formData.cnpj}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Ramo de Atuação</label>
              <input
                type="text"
                name="ramo"
                placeholder="Ex: Tecnologia, Varejo"
                value={formData.ramo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>CEP</label>
              <input
                type="text"
                name="cep"
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Seu CPF</label>
              <input
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Sua Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone (Organização)</label>
              <input
                type="text"
                name="telefone"
                placeholder="+55 (00) 90000-0000"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Seu E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="email@dominio.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirmação de e-mail</label>
              <input
                type="email"
                name="confirmEmail"
                placeholder="email@dominio.com"
                value={formData.confirmEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Sua Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Senha forte"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirmação de senha</label>
              <input
                type="password"
                name="confirmSenha"
                placeholder="Repita a senha"
                value={formData.confirmSenha}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-cadastrar" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar Organização"}
          </button>

          <div className="login-link">
            <p>
              Já tem uma conta? <a onClick={handleLoginClick}>Faça login</a>
            </p>
          </div>
        </form>
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
