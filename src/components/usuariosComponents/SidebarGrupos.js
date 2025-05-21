// src/components/SidebarGrupos.js
import React from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";

function SidebarGrupos() {
  return (
    <div className="grupos-container">
      <h4 className="mb-4 text-center">Grupos</h4>

      <div className="d-grid gap-2 mb-4">
        <button className="btn group-btn">Controladoria</button>
        <button className="btn group-btn">Financeiro</button>
        <button className="btn group-btn">Recursos Humanos</button>
        <button className="btn group-btn">TI</button>
      </div>

      <div className="d-grid gap-2">
        <button className="btn custom-btn">+ Novo Grupo</button>
        <button className="btn custom-btn">+ Novo Usuário</button>
      </div>
    </div>
  );
}

export default SidebarGrupos;
