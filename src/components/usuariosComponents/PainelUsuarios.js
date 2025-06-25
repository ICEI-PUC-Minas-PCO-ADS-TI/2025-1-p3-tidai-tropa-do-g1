import React, { useState } from "react";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import "../../styles/stylesUsuarios/PainelUsuarios.css";
import ModalUsuario from "./ModalUsuario";
import { useUsuarios } from "../../front/UsuarioFuncs";

function PainelUsuarios({ grupoSelecionado }) {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const { usuarios, carregarUsuarios } = useUsuarios(usuarioLogado?.id);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const isAdmin =
    usuarioLogado?.tipoUsuario?.toLowerCase() === "administrador" ||
    usuarioLogado?.tipoUsuario?.toLowerCase() === "admin";

  const abrirModalUsuario = (usuario = null) => {
    setUsuarioEditando(usuario);
    setModalAberto(true);
  };

  // Filtra usuários pelo grupo selecionado e pela busca
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const condicaoGrupo = grupoSelecionado
      ? usuario.tipoUsuario.toLowerCase() === grupoSelecionado.toLowerCase()
      : true;
    const condicaoBusca = usuario.nome
      .toLowerCase()
      .includes(busca.toLowerCase());
    return condicaoGrupo && condicaoBusca;
  });

  return (
    <div className="painel-usuarios">
      <h4>Usuários</h4>

      <div className="filtros">
        <SearchBar
          placeholder="Pesquisar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {isAdmin && (
          <button
            className="custom-btn"
            onClick={() => abrirModalUsuario(null)}
          >
            + Novo Usuário
          </button>
        )}
      </div>

      <div className="usuarios-lista">
        {usuariosFiltrados.length === 0 ? (
          <p style={{ color: "#ccc", padding: "10px" }}>
            Nenhum usuário encontrado.
          </p>
        ) : (
          usuariosFiltrados.map((usuario) => (
            <UserCard
              key={usuario.id}
              nome={usuario.nome}
              onEditar={() => abrirModalUsuario(usuario)}
            />
          ))
        )}
      </div>

      {modalAberto && (
        <ModalUsuario
          usuario={usuarioEditando}
          grupoSelecionado={grupoSelecionado}
          onClose={() => setModalAberto(false)}
          onSalvo={() => {
            carregarUsuarios();
            setModalAberto(false);
          }}
        />
      )}
    </div>
  );
}

export default PainelUsuarios;
