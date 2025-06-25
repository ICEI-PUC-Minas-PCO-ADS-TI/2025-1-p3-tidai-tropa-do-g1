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
    setUserImage(fotoPreview);
  }, [fotoPreview, setUserImage]);

  // Efeito para carregar os dados iniciais do usuário/organização no modal
  useEffect(() => {
    if (usuarioLogado) {
      setId(usuarioLogado.id);
      setNome(usuarioLogado.nome || "");
      setEmail(usuarioLogado.email || "");
      setFotoPreview(
        usuarioLogado.foto ||
          usuarioLogado.imagemPerfil ||
          "https://via.placeholder.com/150"
      );
    } else {
      // Se não há dados logados, redireciona para a tela de login
      alert("Sessão expirada ou usuário não logado. Faça login novamente.");
      navigate("/");
    }
  }, [usuarioLogado, navigate]); // Dependências: re-executa se usuarioLogado mudar ou navigate mudar

  // Lida com a seleção de arquivo para a imagem de perfil
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file); // Converte a imagem para Base64
    }
  }

  // Função para fazer logout
  function handleLogout() {
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
