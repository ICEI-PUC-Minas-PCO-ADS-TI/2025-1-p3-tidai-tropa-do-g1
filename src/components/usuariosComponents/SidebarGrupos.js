// src/components/SidebarGrupos.js
import React from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";

function SidebarGrupos() {
  return (
    <div className="grupos-container">
      <h4>Grupos</h4>

      <div className="grupo-lista">
        <button className="group-btn">Controladoria</button>
        <button className="group-btn">Financeiro</button>
        <button className="group-btn">Recursos Humanos</button>
        <button className="group-btn">TI</button>
      </div>

      <div className="grupo-acoes">
        <button className="custom-btn">+ Novo Grupo</button>
        <button className="custom-btn">+ Novo Usuário</button>
      </div>
    </div>
  );
}

export default SidebarGrupos;
