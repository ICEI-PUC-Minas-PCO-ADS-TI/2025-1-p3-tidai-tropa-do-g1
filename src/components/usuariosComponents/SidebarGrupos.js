// src/components/usuariosComponents/SidebarGrupos.jsx
import React, { useState } from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";
import GrupoBotao from "./GrupoBotao";
import { useGrupos } from "../../front/SidebarFuncs";
import ModalGrupo from "../usuariosComponents/ModalGrupo";
import api from "../../services/api";

function SidebarGrupos({ grupoSelecionado, setGrupoSelecionado }) {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const { grupos, carregarGrupos } = useGrupos(usuarioLogado?.id);
  const [modalAberto, setModalAberto] = useState(false);
  const [grupoEditando, setGrupoEditando] = useState(null);
  const [nomeGrupo, setNomeGrupo] = useState("");

  const isAdmin = () =>
    usuarioLogado?.tipoUsuario?.toLowerCase() === "administrador";

  const abrirModalGrupo = (grupo = null) => {
    setGrupoEditando(grupo);
    setNomeGrupo(grupo?.nome || "");
    setModalAberto(true);
  };

  const salvarGrupo = async () => {
    if (!nomeGrupo.trim()) {
      alert("Nome do grupo é obrigatório.");
      return false;
    }

    try {
      const payload = {
        nome: nomeGrupo,
        descricao: `Grupo ${nomeGrupo}`,
        tipo: nomeGrupo,
        organizacaoId: usuarioLogado.id,
      };

      if (grupoEditando) {
        await api.put(`/Grupos/${grupoEditando.id}`, payload);
        alert("Grupo atualizado com sucesso!");
      } else {
        await api.post("/Grupos", payload);
        alert("Grupo criado com sucesso!");
      }

      await carregarGrupos();
      return true;
    } catch (err) {
      console.error("Erro ao salvar grupo:", err);
      alert("Erro ao salvar grupo.");
      return false;
    }
  };

  const excluirGrupo = async (grupoId) => {
    if (!window.confirm("Tem certeza que deseja excluir este grupo?")) return;

    try {
      await api.delete(`/Grupos/${grupoId}`);
      alert("Grupo excluído com sucesso!");
      await carregarGrupos();
    } catch (err) {
      console.error("Erro ao excluir grupo:", err);
      alert("Erro ao excluir grupo.");
    }
  };

  return (
    <div className="grupos-container">
      <h4>Grupos</h4>
      <div className="grupo-lista">
        {grupos.map((grupo) => (
          <div key={grupo.id} className="grupo-item">
            <GrupoBotao
              nome={grupo.nome}
              ativo={grupoSelecionado === grupo.nome}
              onClick={() => setGrupoSelecionado(grupo.nome)}
            />
            {isAdmin() && (
              <div className="grupo-actions">
                <button onClick={() => abrirModalGrupo(grupo)}>✏️</button>
                <button onClick={() => excluirGrupo(grupo.id)}>🗑️</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAdmin() && (
        <button className="custom-btn" onClick={() => abrirModalGrupo(null)}>
          + Novo Grupo
        </button>
      )}

      {modalAberto && (
        <ModalGrupo
          nome={nomeGrupo}
          setNome={setNomeGrupo}
          onClose={() => setModalAberto(false)}
          onSave={salvarGrupo}
        />
      )}
    </div>
  );
}

export default SidebarGrupos;
