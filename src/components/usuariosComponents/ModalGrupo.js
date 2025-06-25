import React from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";

function ModalGrupo({ nome, setNome, onClose, onSave }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await onSave();
    if (sucesso) onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{nome ? "Editar Grupo" : "Novo Grupo"}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>Nome do Grupo:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            autoFocus
          />
          <div className="modal-buttons">
            <button type="submit" className="btn-salvar">
              Salvar
            </button>
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalGrupo;
