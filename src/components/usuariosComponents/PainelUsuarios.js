import React, { useState } from "react";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import TipoUsuarioSelect from "./TipoUsuarioSelect";
import "../../styles/stylesUsuarios/PainelUsuarios.css";

function PainelUsuarios() {
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [busca, setBusca] = useState("");

  const usuarios = Array(9).fill("Nome do Usuário");

  return (
    <div className="painel-usuarios">
      <h4>Usuários</h4>

      <div className="filtros">
        <TipoUsuarioSelect value={tipoSelecionado} onChange={(e) => setTipoSelecionado(e.target.value)} />
        <SearchBar placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)} />
      </div>

      <div className="usuarios-lista">
        {usuarios
          .filter(nome => nome.toLowerCase().includes(busca.toLowerCase())) // Simples filtro de busca
          .map((nome, index) => (
            <UserCard key={index} nome={nome} />
          ))}
      </div>
    </div>
  );
}

export default PainelUsuarios;
