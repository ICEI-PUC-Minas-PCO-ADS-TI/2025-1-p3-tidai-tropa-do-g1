import React from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";
import GrupoBotao from "./GrupoBotao";

function SidebarGrupos() {
  const grupos = ["Controladoria", "Financeiro", "Recursos Humanos", "TI"];

  return (
    <div className="grupos-container">
      <h4>Grupos</h4>

      <div className="grupo-lista">
        {grupos.map((grupo, index) => (
          <GrupoBotao key={index} nome={grupo} onClick={() => console.log(`Clicou em ${grupo}`)} />
        ))}
      </div>

      <div className="grupo-acoes">
        <button className="custom-btn">+ Novo Grupo</button>
        <button className="custom-btn">+ Novo Usuário</button>
      </div>
    </div>
  );
}

export default SidebarGrupos;
