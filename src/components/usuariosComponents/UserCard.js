// src/components/UserCard.js
import React from "react";
import "../../styles/stylesUsuarios/UserCard.css";

function UserCard({ nome }) {
  return (
    <div className="col-12 col-md-4">
      <div className="user-card d-flex align-items-center p-3 rounded">
        <i className="bi bi-person-circle fs-3 me-3"></i>
        <span>{nome}</span>
      </div>
    </div>
  );
}

export default UserCard;
