import React, { useState } from "react";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import TipoUsuarioSelect from "./TipoUsuarioSelect";
import "../../styles/stylesUsuarios/PainelUsuarios.css";

// Lista de usuários com seus grupos
const todosUsuarios = [
  { nome: "Douglas", grupo: "ti" },
  { nome: "Ingrid", grupo: "ti" },
  { nome: "Isabelle", grupo: "financeiro" },
  { nome: "Ranier", grupo: "financeiro" },
  { nome: "Clara", grupo: "rh" },
  { nome: "Luiz", grupo: "controladoria" },
];

function PainelUsuarios() {
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [busca, setBusca] = useState("");

  // Filtro baseado no tipo e na busca
  const usuariosFiltrados = todosUsuarios.filter(usuario => {
    const condicaoGrupo = tipoSelecionado ? usuario.grupo === tipoSelecionado : true;
    const condicaoBusca = usuario.nome.toLowerCase().includes(busca.toLowerCase());
    return condicaoGrupo && condicaoBusca;
  });

  return (
    <div className="painel-usuarios">
      <h4>Usuários</h4>

      <div className="filtros">
        <TipoUsuarioSelect
          value={tipoSelecionado}
          onChange={(e) => setTipoSelecionado(e.target.value)}
        />
        <SearchBar
          placeholder="Pesquisar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="usuarios-lista">
        {usuariosFiltrados.length === 0 ? (
          <p style={{ color: "#ccc", padding: "10px" }}>Nenhum usuário encontrado.</p>
        ) : (
          usuariosFiltrados.map((usuario, index) => (
            <UserCard key={index} nome={usuario.nome} />
          ))
        )}
      </div>
    </div>
  );
}

export default PainelUsuarios;
