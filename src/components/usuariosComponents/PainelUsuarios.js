import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import "../../styles/stylesUsuarios/PainelUsuarios.css";
import api from "../../services/api";

function PainelUsuarios({ grupoSelecionado }) {
  const [usuarios, setUsuarios] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [busca, setBusca] = useState("");
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  useEffect(() => {
    carregarUsuarios();
    carregarGrupos();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await api.get("/Usuarios");
      const usuariosFiltrados = response.data.filter(
        (u) => u.organizacaoId === usuarioLogado.organizacaoId
      );
      setUsuarios(usuariosFiltrados);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  const carregarGrupos = async () => {
    try {
      const response = await api.get("/Grupos");
      const gruposFiltrados = response.data.filter(
        (g) => g.organizacaoId === usuarioLogado.organizacaoId
      );
      setGrupos(gruposFiltrados);
    } catch (err) {
      console.error("Erro ao buscar grupos:", err);
    }
  };

  const criarUsuario = async () => {
    const nome = prompt("Nome do usuário:");
    const email = prompt("Email do usuário:");
    const senha = prompt("Senha:");

    if (!nome || !email || !senha) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    if (!grupoSelecionado) {
      alert("Selecione um grupo para associar o usuário.");
      return;
    }

    const grupo = grupos.find(
      (g) => g.nome.toLowerCase() === grupoSelecionado.toLowerCase()
    );

    if (!grupo) {
      alert("Grupo não encontrado.");
      return;
    }

    const payloadUsuario = {
      id: 0,
      nome,
      email,
      senha,
      documento: "",
      tipoDocumento: "CPF",
      dataNascimento: new Date().toISOString(),
      tipoUsuario: grupo.nome, // O tipoUsuario fica igual ao nome do grupo
      ativo: true,
      organizacaoId: usuarioLogado.organizacaoId,
    };

    try {
      const responseUsuario = await api.post("/Usuarios", payloadUsuario);

      const payloadGrupoUsuario = {
        usuarioId: responseUsuario.data.id,
        grupoId: grupo.id,
      };

      await api.post("/GrupoUsuarios", payloadGrupoUsuario);

      alert("Usuário criado e vinculado ao grupo com sucesso!");
      carregarUsuarios();
    } catch (err) {
      console.error(err);
      alert("Erro ao criar usuário.");
    }
  };

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
        <button className="custom-btn" onClick={criarUsuario}>
          + Novo Usuário
        </button>
      </div>

      <div className="usuarios-lista">
        {usuariosFiltrados.length === 0 ? (
          <p style={{ color: "#ccc", padding: "10px" }}>
            Nenhum usuário encontrado.
          </p>
        ) : (
          usuariosFiltrados.map((usuario) => (
            <UserCard key={usuario.id} nome={usuario.nome} />
          ))
        )}
      </div>
    </div>
  );
}

export default PainelUsuarios;

/*import React, { useState } from "react";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import "../../styles/stylesUsuarios/PainelUsuarios.css";

const todosUsuarios = [
  { nome: "Douglas", grupo: "ti" },
  { nome: "Ingrid", grupo: "ti" },
  { nome: "Isabelle", grupo: "financeiro" },
  { nome: "Ranier", grupo: "financeiro" },
  { nome: "Clara", grupo: "rh" },
  { nome: "Luiz", grupo: "controladoria" },
];

function PainelUsuarios({ grupoSelecionado }) {
  const [busca, setBusca] = useState("");

  const usuariosFiltrados = todosUsuarios.filter((usuario) => {
    const condicaoGrupo = grupoSelecionado
      ? usuario.grupo === grupoSelecionado
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
      </div>

      <div className="usuarios-lista">
        {usuariosFiltrados.length === 0 ? (
          <p style={{ color: "#ccc", padding: "10px" }}>
            Nenhum usuário encontrado.
          </p>
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
*/
