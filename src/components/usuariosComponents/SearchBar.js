import React from "react";
import "../../styles/stylesUsuarios/PainelUsuarios.css";

function SearchBar({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchBar;
