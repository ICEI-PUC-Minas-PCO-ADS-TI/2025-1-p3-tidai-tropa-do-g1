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
      <main className="container-fluid mt-4">
        <div className="row">
          <SidebarGrupos />
          <PainelUsuarios />
        </div>
      </main>
      <FooterUsuarios />
    </div>
  );
}

export default UsuariosPage;
