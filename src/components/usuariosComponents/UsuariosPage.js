// src/components/UsuariosPage.js
import React from "react";
import TopBar from "../TopBar";
import SidebarGrupos from "./SidebarGrupos";
import PainelUsuarios from "./PainelUsuarios";
import FooterUsuarios from "./FooterUsuarios";
import "../../styles/stylesUsuarios/UsuariosPage.css";

function UsuariosPage() {
  return (
    <div className="usuarios-page">
      <TopBar />
      <div className="usuarios-main">
        <div className="sidebar">
          <SidebarGrupos />
        </div>
        <div className="painel">
          <PainelUsuarios />
        </div>
      </div>
      <FooterUsuarios />
    </div>
  );
}

export default UsuariosPage;
