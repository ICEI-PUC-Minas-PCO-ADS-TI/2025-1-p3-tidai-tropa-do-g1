// src/components/GrupoBotao.js
import React from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";

function GrupoBotao({ nome, onClick }) {
  return (
    <button className="group-btn" onClick={onClick}>
      {nome}
    </button>
  );
}

export default GrupoBotao;
