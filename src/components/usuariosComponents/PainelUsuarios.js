// src/components/PainelUsuarios.js
import React from "react";
import UserCard from "./UserCard";
import "../../styles/stylesUsuarios/PainelUsuarios.css";

function PainelUsuarios() {
  const usuarios = Array(9).fill("Nome do Usuário");

  return (
    <div className="usuarios-container">
      <h4 className="mb-4 mt-4 text-center">Usuários</h4>

      <div className="row mb-4 g-2">
        <div className="col-md-4">
          <select className="form-select custom-input">
            <option value="" disabled hidden selected>
              Tipo de Usuário
            </option>
            <option value="controladoria">Controladoria</option>
            <option value="financeiro">Financeiro</option>
            <option value="rh">Recursos Humanos</option>
            <option value="ti">TI</option>
          </select>
        </div>
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Pesquisar..."
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
