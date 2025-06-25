import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/ProfileModal.css";

function ProfileModal({ onClose, userImage, setUserImage }) {
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const tipoPerfilLogado = localStorage.getItem("tipoPerfil");

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [fotoPreview, setFotoPreview] = useState("");

  useEffect(() => {
    if (!usuarioLogado) {
      window.confirm("Sessão expirada. Faça login novamente.");
      navigate("/");
      return;
    }

    setId(usuarioLogado.id);
    setNome(usuarioLogado.nome);
    setEmail(usuarioLogado.email);

    const imagem =
      usuarioLogado.foto ||
      usuarioLogado.imagemPerfil ||
      userImage ||
      "https://via.placeholder.com/150";

    setFotoPreview(imagem);
    setUserImage(imagem);
  }, [navigate, usuarioLogado, setUserImage, userImage]);

  const handleSalvar = async () => {
    if (!senhaAntiga) {
      window.confirm("Informe sua senha atual.");
      return;
    }

    const novaSenha = senhaNova || senhaAntiga;

    try {
      let endpointBase = "Usuarios";
      let payloadAtual = null;

      try {
        const responseGet = await api.get(`/Usuarios/${id}`);
        payloadAtual = responseGet.data;
      } catch (err) {
        if (err.response?.status === 404) {
          endpointBase = "Organizacoes";
          const responseGet = await api.get(`/Organizacoes/${id}`);
          payloadAtual = responseGet.data;
        } else {
          throw err;
        }
      }

      payloadAtual.senha = novaSenha;

      const responsePut = await api.put(`/${endpointBase}/${id}`, payloadAtual);
      localStorage.setItem("usuarioLogado", JSON.stringify(responsePut.data));

      const confirmacao = window.confirm(
        "Senha atualizada com sucesso!\n\nVocê será redirecionado para o login."
      );

      if (confirmacao) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("tipoPerfil");
        delete api.defaults.headers.common["Authorization"];
        navigate("/");
      }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      window.confirm(
        err.response?.data?.message ||
          "Erro ao atualizar a senha. Tente novamente."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoPerfil");
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Perfil</h2>
        <div className="foto-container">
          <img
            src={fotoPreview}
            alt="Foto de Perfil"
            className="foto-preview"
          />
        </div>

        <label>Nome:</label>
        <p>{nome}</p>

        <label>Email:</label>
        <p>{email}</p>

        <label>Senha atual:</label>
        <input
          type="password"
          placeholder="Senha atual"
          value={senhaAntiga}
          onChange={(e) => setSenhaAntiga(e.target.value)}
        />

        <label>Nova senha:</label>
        <input
          type="password"
          placeholder="Nova senha (opcional)"
          value={senhaNova}
          onChange={(e) => setSenhaNova(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn-salvar" onClick={handleSalvar}>
            Salvar
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
          <button className="btn-fechar" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
