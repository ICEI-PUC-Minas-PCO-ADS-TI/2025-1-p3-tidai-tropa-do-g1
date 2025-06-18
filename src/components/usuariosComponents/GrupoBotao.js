import React from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";

function GrupoBotao({ nome, onClick, ativo }) {
  return (
    <button
      className={`group-btn ${ativo ? "ativo" : ""}`}
      onClick={onClick}
    >
      {nome}
    </button>
  );
}

export default GrupoBotao;
