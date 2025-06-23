import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/ProfileModal.css";

function ProfileModal({ onClose, userImage, setUserImage }) {
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [id, setId] = useState(usuarioLogado?.id || "");
  const [nome, setNome] = useState(usuarioLogado?.nome || "");
  const [email, setEmail] = useState(usuarioLogado?.email || "");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [fotoPreview, setFotoPreview] = useState(
    usuarioLogado?.foto || userImage || ""
  );

  useEffect(() => {
    setUserImage(fotoPreview);
  }, [fotoPreview]);

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

  async function handleSalvar() {
    try {
      if (!senhaAntiga) {
        alert("Por favor, insira sua senha atual para confirmar.");
        return;
      }

      const loginConfirm = await api.post("/usuarios/login", {
        email: email,
        senha: senhaAntiga,
        organizacao: usuarioLogado.organizacao.nome,
      });

      if (!loginConfirm.data || !loginConfirm.data.token) {
        alert("Senha atual incorreta.");
        return;
      }

      const payload = {
        id: id,
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senhaNova ? senhaNova : senhaAntiga,
        foto: fotoPreview,
        documento: usuarioLogado.documento,
        tipoDocumento: usuarioLogado.tipoDocumento,
        dataNascimento: usuarioLogado.dataNascimento,
        tipoUsuario: usuarioLogado.tipoUsuario,
        ativo: true,
        organizacaoId: usuarioLogado.organizacaoId,
      };

      const response = await api.put(`/usuarios/${id}`, payload);

      localStorage.setItem("usuarioLogado", JSON.stringify(response.data));

      alert("Perfil atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil. Verifique suas informações.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("usuarioLogado");
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
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

        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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
          placeholder="Nova senha (ou deixe em branco)"
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
