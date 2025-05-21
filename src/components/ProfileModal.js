import React, { useEffect, useState } from "react";
import "../styles/ProfileModal.css";

function ProfileModal({ onClose, userImage, setUserImage }) {
  const [nome, setNome] = useState("Nome User");
  const [email, setEmail] = useState("email@exemplo.com");
  const [setSenha] = useState("");
  const [fotoPreview, setFotoPreview] = useState("/user.png");

  useEffect(() => {
    const storedNome = localStorage.getItem("perfil_nome");
    const storedEmail = localStorage.getItem("perfil_email");
    const storedFoto = localStorage.getItem("perfil_foto");

    if (storedNome) setNome(storedNome);
    if (storedEmail) setEmail(storedEmail);
    if (storedFoto) setFotoPreview(storedFoto);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserImage(reader.result);
      setFotoPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSalvar = () => {
    // enviar os dados para a API ou armazenar localmente
    localStorage.setItem("perfil_nome", nome);
    localStorage.setItem("perfil_email", email);
    localStorage.setItem("perfil_foto", fotoPreview);

    alert("Perfil atualizado com sucesso!");
    onClose();
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
          <input type="file" onChange={handleImageChange} />
        </div>

        <label>Nome:</label>
        <input
          type="text"
          placeholder="nome"
          onChange={(e) => setNome(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="senha"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha:</label>
        <input
          type="password"
          placeholder="senha"
          onChange={(e) => setSenha(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn-salvar" onClick={handleSalvar}>
            Salvar
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
