import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileModal.css";

function ProfileModal({ onClose, userImage, setUserImage }) {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [emailAntigo, setEmailAntigo] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [fotoPreview, setFotoPreview] = useState(userImage || "");

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleLogout() {
    localStorage.removeItem("usuarioLogadoEmail");
    localStorage.removeItem("usuarioLogadoOrganizacao");
    navigate("/");
  }

  function handleSalvar() {
    const emailLogado = localStorage.getItem("usuarioLogadoEmail");
    const organizacaoLogada = localStorage.getItem("usuarioLogadoOrganizacao");

    if (!emailLogado || !organizacaoLogada) {
      alert("Erro: nenhum usuário está logado.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const index = usuarios.findIndex(
      (u) => u.email === emailLogado && u.organizacao === organizacaoLogada
    );

    if (index === -1) {
      alert("Usuário logado não encontrado.");
      return;
    }

    if (emailAntigo.trim().toLowerCase() !== emailLogado) {
      alert("Email antigo não confere com o usuário logado.");
      return;
    }

    if (senhaAntiga !== usuarios[index].senha) {
      alert("Senha antiga incorreta.");
      return;
    }

    if (!senhaNova) {
      alert("Por favor, insira a nova senha.");
      return;
    }

    if (
      novoEmail.trim().toLowerCase() !== emailLogado &&
      usuarios.some(
        (u) =>
          u.email === novoEmail.trim().toLowerCase() && u.email !== emailLogado
      )
    ) {
      alert("Este email já está em uso por outro usuário.");
      return;
    }

    // Atualiza dados do usuário
    usuarios[index] = {
      ...usuarios[index],
      nome: nome.trim(),
      email: novoEmail.trim().toLowerCase(),
      senha: senhaNova,
      foto: fotoPreview,
      organizacao: usuarios[index].organizacao,
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogadoEmail", novoEmail.trim().toLowerCase());
    localStorage.setItem("perfil_nome", nome.trim());
    localStorage.setItem("perfil_email", novoEmail.trim().toLowerCase());
    localStorage.setItem("perfil_foto", fotoPreview);

    alert("Perfil atualizado com sucesso!");

    setNome("");
    setEmailAntigo("");
    setNovoEmail("");
    setSenhaAntiga("");
    setSenhaNova("");
    setFotoPreview("");

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Perfil</h2>

        <div className="foto-container">
          <img
            src={fotoPreview || "https://via.placeholder.com/150"}
            alt="Foto de Perfil"
            className="foto-preview"
          />
          <input type="file" onChange={handleImageChange} />
        </div>

        <label>Nome:</label>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label>Email antigo (confirmação):</label>
        <input
          type="email"
          placeholder="Digite seu email antigo"
          value={emailAntigo}
          onChange={(e) => setEmailAntigo(e.target.value)}
        />

        <label>Novo email:</label>
        <input
          type="email"
          placeholder="Digite seu novo email"
          value={novoEmail}
          onChange={(e) => setNovoEmail(e.target.value)}
        />

        <label>Senha antiga:</label>
        <input
          type="password"
          placeholder="Senha antiga"
          value={senhaAntiga}
          onChange={(e) => setSenhaAntiga(e.target.value)}
        />

        <label>Nova senha:</label>
        <input
          type="password"
          placeholder="Nova senha"
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
