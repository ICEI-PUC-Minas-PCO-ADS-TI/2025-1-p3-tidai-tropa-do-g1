// src/components/UserCard.js
import React from "react";
import "../../styles/stylesUsuarios/UserCard.css";

function UserCard({ nome }) {
  return (
    <div className="user-card">
      <i className="bi bi-person-circle icon"></i>
      <span className="user-name">{nome}</span>
    </div>
  );
}

export default UserCard;
