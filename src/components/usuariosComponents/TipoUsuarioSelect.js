import React from "react";
import "../../styles/stylesUsuarios/PainelUsuarios.css";

function TipoUsuarioSelect({ value, onChange }) {
  return (
    <select value={value} onChange={onChange} className="tipo-select">
      <option value="" disabled>Tipo de Usuário</option>
      <option value="controladoria">Controladoria</option>
      <option value="financeiro">Financeiro</option>
      <option value="rh">Recursos Humanos</option>
      <option value="ti">TI</option>
    </select>
  );
}

export default TipoUsuarioSelect;
