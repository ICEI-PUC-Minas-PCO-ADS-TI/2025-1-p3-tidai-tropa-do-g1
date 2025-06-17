import React from "react";
import UserCard from "./UserCard";
import "../../styles/stylesUsuarios/PainelUsuarios.css";

function PainelUsuarios() {
  const usuarios = Array(9).fill("Nome do Usuário");

  return (
    <div className="painel-usuarios">
      <h4>Usuários</h4>

      <div className="filtros">
        <select>
          <option value="" disabled selected>Tipo de Usuário</option>
          <option value="controladoria">Controladoria</option>
          <option value="financeiro">Financeiro</option>
          <option value="rh">Recursos Humanos</option>
          <option value="ti">TI</option>
        </select>

        <input type="text" placeholder="Pesquisar..." />
      </div>

      <div className="usuarios-lista">
        {usuarios.map((nome, index) => (
          <UserCard key={index} nome={nome} />
        ))}
      </div>
    </div>
  );
}

export default PainelUsuarios;
