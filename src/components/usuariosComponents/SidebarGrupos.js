// src/components/SidebarGrupos.js
import React from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";

function SidebarGrupos() {
  return (
    <div className="col-12 col-md-3 px-4 grupos-container text-center">
      <h4 className="mb-4">Grupos</h4>

      <div className="d-grid gap-2 mb-4">
        <button className="btn group-btn">Controladoria</button>
        <button className="btn group-btn">Financeiro</button>
        <button className="btn group-btn">Recursos Humanos</button>
        <button className="btn group-btn">TI</button>
      </div>

      <div className="mb-4 d-grid gap-2">
        <button className="btn custom-btn">+ Novo Grupo</button>
        <button className="btn custom-btn">+ Novo Usuário</button>
      </div>
    </div>
  );
}

export default SidebarGrupos;
