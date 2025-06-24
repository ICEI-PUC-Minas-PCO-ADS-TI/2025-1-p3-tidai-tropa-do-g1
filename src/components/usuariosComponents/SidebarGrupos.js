import React, { useState, useEffect } from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";
import GrupoBotao from "./GrupoBotao";
import api from "../../services/api";

function SidebarGrupos({ grupoSelecionado, setGrupoSelecionado }) {
  const [grupos, setGrupos] = useState([]);
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  useEffect(() => {
    carregarGrupos();
  }, []);

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

  const criarGrupo = async () => {
    const nome = prompt("Digite o nome do novo grupo:");
    if (!nome) return;

    const payload = {
      id: 0,
      nome: nome,
      descricao: `Grupo ${nome}`,
      tipo: nome,
      organizacaoId: usuarioLogado.organizacaoId,
      organizacao: {
        id: usuarioLogado.organizacaoId,
        nome: usuarioLogado.nome,
        cnpj: usuarioLogado.cnpj,
        dataCriacao: usuarioLogado.dataCriacao,
        ramo: usuarioLogado.ramo,
        telefone: usuarioLogado.telefone,
        cep: usuarioLogado.cep,
        email: usuarioLogado.email,
        senha: usuarioLogado.senha,
        imagemPerfil: usuarioLogado.imagemPerfil
      },
    };

    try {
      await api.post("/Grupos", payload);
      alert("Grupo criado com sucesso!");
      carregarGrupos();
    } catch (err) {
      console.error("Erro detalhado:", err.response?.data);
      alert("Erro ao criar grupo.");
    }
  };

  return (
    <div className="grupos-container">
      <h4>Grupos</h4>

      <div className="grupo-lista">
        {grupos.map((grupo) => (
          <GrupoBotao
            key={grupo.id}
            nome={grupo.nome}
            ativo={grupoSelecionado === grupo.nome}
            onClick={() => setGrupoSelecionado(grupo.nome)}
          />
        ))}
      </div>

      <div className="grupo-acoes">
        <button className="custom-btn" onClick={criarGrupo}>
          + Novo Grupo
        </button>
      </div>
    </div>
  );
}

export default SidebarGrupos;

/*import React from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";
import GrupoBotao from "./GrupoBotao";

function SidebarGrupos({ grupoSelecionado, setGrupoSelecionado }) {
  const grupos = ["Controladoria", "Financeiro", "Recursos Humanos", "TI"];

  return (
    <div className="grupos-container">
      <h4>Grupos</h4>

      <div className="grupo-lista">
        {grupos.map((grupo, index) => (
          <GrupoBotao
            key={index}
            nome={grupo}
            ativo={grupoSelecionado.toLowerCase() === grupo.toLowerCase()}
            onClick={() => setGrupoSelecionado(grupo.toLowerCase())}
          />
        ))}
      </div>

      <div className="grupo-acoes">
        <button className="custom-btn">+ Novo Grupo</button>
        <button className="custom-btn">+ Novo Usuário</button>
      </div>
    </div>
  );
}

export default SidebarGrupos;
*/
