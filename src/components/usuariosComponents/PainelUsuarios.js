// src/components/PainelUsuarios.js
import React from "react";
import UserCard from "./UserCard";
import "../../styles/stylesUsuarios/PainelUsuarios.css";

function PainelUsuarios() {
  const usuarios = Array(9).fill("Nome do Usuário");

  return (
    <div className="col-12 col-md-9 px-4 usuarios-container text-center">
      <h4 className="mb-4 mt-4">Usuários</h4>

      <div className="row mb-4">
        <div className="col-12 col-md-4 mb-2 mb-md-0">
          <select className="form-select custom-input" id="tipoUsuario">
            <option value="" disabled hidden selected>
              Tipo de Usuário
            </option>
            <option value="controladoria">Controladoria</option>
            <option value="financeiro">Financeiro</option>
            <option value="rh">Recursos Humanos</option>
            <option value="ti">TI</option>
          </select>
        </div>
        <div className="col-12 col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Pesquisar..."
              id="pesquisaUsuario"
            />
            <span className="input-group-text custom-input">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {usuarios.map((nome, index) => (
          <UserCard key={index} nome={nome} />
        ))}
      </div>
    </div>
  );
}

export default PainelUsuarios;
