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

  // Inicializa os dados do usuário
  useEffect(() => {
    if (!usuarioLogado) {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/");
      return;
    }

    setId(usuarioLogado.id);
    setNome(usuarioLogado.nome);
    setEmail(usuarioLogado.email);

    // Garante que a imagem continue aparecendo no modal
    const imagem =
      usuarioLogado.foto ||
      usuarioLogado.imagemPerfil ||
      userImage ||
      "https://via.placeholder.com/150";

    setFotoPreview(imagem);
    setUserImage(imagem); // Sincroniza com componente pai
  }, [navigate, usuarioLogado, setUserImage, userImage]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoPerfil");
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
  };

  // Salvar nova senha
  const handleSalvar = async () => {
    if (!senhaAntiga) {
      alert("Informe sua senha atual.");
      return;
    }

    const novaSenha = senhaNova || senhaAntiga;

    let payload = {};
    let endpoint = "";

    if (tipoPerfilLogado === "admin") {
      // Atualiza apenas a senha da organização
      payload = {
        ...usuarioLogado,
        senha: novaSenha,
        // Imagem permanece a mesma
        imagemPerfil: usuarioLogado.imagemPerfil,
      };
      endpoint = `/Organizacoes/${id}`;
    } else {
      // Atualiza apenas a senha do usuário
      payload = {
        ...usuarioLogado,
        senha: novaSenha,
        foto: usuarioLogado.foto, // Mantém a imagem atual
      };
      endpoint = `/Usuarios/${id}`;
    }

    try {
      const resp = await api.put(endpoint, payload);
      localStorage.setItem("usuarioLogado", JSON.stringify(resp.data));
      alert("Senha atualizada com sucesso!");
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      alert(
        err.response?.data?.message ||
          "Erro ao atualizar a senha. Tente novamente."
      );
    }
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
