import React, { useState } from "react";
import TopBar from "../TopBar";
import SidebarGrupos from "./SidebarGrupos";
import PainelUsuarios from "./PainelUsuarios";
import FooterUsuarios from "./FooterUsuarios";
import "../../styles/stylesUsuarios/UsuariosPage.css";

function UsuariosPage() {
  const [grupoSelecionado, setGrupoSelecionado] = useState("");

  return (
    <div className="usuarios-page">
      <TopBar />
      <div className="usuarios-main">
        <div className="sidebar">
          <SidebarGrupos
            grupoSelecionado={grupoSelecionado}
            setGrupoSelecionado={setGrupoSelecionado}
          />
        </div>
        <div className="painel">
          <PainelUsuarios grupoSelecionado={grupoSelecionado} />
        </div>
      </div>
      <FooterUsuarios />
    </div>
  );
}

export default UsuariosPage;

/* src/components/UsuariosPage.js
import React, { useState } from "react";
import TopBar from "../TopBar";
import SidebarGrupos from "./SidebarGrupos";
import PainelUsuarios from "./PainelUsuarios";
import FooterUsuarios from "./FooterUsuarios";
import "../../styles/stylesUsuarios/UsuariosPage.css";

function UsuariosPage() {
  const [grupoSelecionado, setGrupoSelecionado] = useState("");

  return (
    <div className="usuarios-page">
      <TopBar />
      <div className="usuarios-main">
        <div className="sidebar">
          <SidebarGrupos
            grupoSelecionado={grupoSelecionado}
            setGrupoSelecionado={setGrupoSelecionado}
          />
        </div>
        <div className="painel">
          <PainelUsuarios grupoSelecionado={grupoSelecionado} />
        </div>
      </div>
      <FooterUsuarios />
    </div>
  );
}

export default UsuariosPage;
*/
