// src/components/usuariosComponents/SidebarGrupos.jsx
import React, { useState, useEffect } from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";
import GrupoBotao from "./GrupoBotao";
import { useGrupos } from "../../front/SidebarFuncs"; // Hook customizado para carregar grupos
import ModalGrupo from "../usuariosComponents/ModalGrupo"; // Modal para criar/editar grupo
import api from "../../services/api"; // Instância do Axios ou similar para chamadas de API

function SidebarGrupos({ grupoSelecionado, setGrupoSelecionado }) {
  // Garante que usuarioLogado seja um objeto e tenha as propriedades necessárias
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || '{}');

  // Usando o hook customizado useGrupos para gerenciar grupos e o carregamento
  // O hook useGrupos deve retornar 'grupos' e 'carregarGrupos'
  const { grupos, carregarGrupos, loadingGrupos, erroGrupos } = useGrupos(usuarioLogado?.organizacaoId); 
  // Modifiquei para passar organizacaoId para useGrupos e adicionei loading/erro para feedback

  const [modalAberto, setModalAberto] = useState(false); // Controla a visibilidade do modal de grupo
  const [grupoEditando, setGrupoEditando] = useState(null); // Armazena o grupo sendo editado (ou null para criação)
  const [nomeGrupo, setNomeGrupo] = useState(""); // Estado para o nome do grupo no formulário do modal

  // Verifica se o usuário logado é administrador
  const isAdmin = () =>
    usuarioLogado?.tipoUsuario?.toLowerCase() === "administrador";

  // Função para abrir o modal de criação/edição de grupo
  const abrirModalGrupo = (grupo = null) => {
    setGrupoEditando(grupo); // Define o grupo para edição (se null, é criação)
    setNomeGrupo(grupo?.nome || ""); // Preenche o nome no modal se for edição
    setModalAberto(true); // Abre o modal
  };

  // Função para salvar (criar ou atualizar) um grupo
  const salvarGrupo = async () => {
    if (!nomeGrupo.trim()) {
      alert("Nome do grupo é obrigatório.");
      return false; // Retorna false para indicar falha na validação
    }

    try {
      // Payload para a API (dados a serem enviados)
      // Removido o objeto 'organizacao' completo, pois a API C# deve esperar apenas o 'organizacaoId'
      const payload = {
        nome: nomeGrupo,
        descricao: `Grupo ${nomeGrupo}`, // Descrição simples
        tipo: nomeGrupo, // Tipo do grupo
        organizacaoId: usuarioLogado.organizacaoId, // Usando organizacaoId aqui para consistencia
      };

      if (grupoEditando) {
        // Se estiver editando um grupo existente
        payload.id = grupoEditando.id; // Adiciona o ID ao payload para a atualização
        await api.put(`/Grupos/${grupoEditando.id}`, payload);
        alert("Grupo atualizado com sucesso!");
      } else {
        // Se estiver criando um novo grupo
        await api.post("/Grupos", payload);
        alert("Grupo criado com sucesso!");
      }

      await carregarGrupos(); // Recarrega a lista de grupos após salvar
      setModalAberto(false); // Fecha o modal após o sucesso
      return true; // Retorna true para indicar sucesso
    } catch (err) {
      // Tratamento de erro aprimorado (similar ao que já fizemos)
      if (err.response) {
        console.error("Erro ao salvar grupo (Resposta do servidor):", 
          "Status:", err.response.status, 
          "Dados:", err.response.data, 
          "Headers:", err.response.headers
        );
        alert(`Erro ao salvar grupo: ${err.response.status} - ${err.response.data?.message || 'Erro desconhecido do servidor.'}`);
      } else if (err.request) {
        console.error("Erro ao salvar grupo (Erro de rede/CORS): Nenhuma resposta recebida do servidor.", err.message);
        alert("Erro de conexão ao servidor. Verifique se o backend C# está rodando e o CORS configurado.");
      } else {
        console.error("Erro ao salvar grupo (Erro desconhecido):", err.message);
        alert("Erro interno ao salvar grupo.");
      }
      return false; // Retorna false para indicar falha na operação
    }
  };

  // Função para excluir um grupo
  const excluirGrupo = async (grupoId) => {
    if (!window.confirm("Tem certeza que deseja excluir este grupo?")) return;

    try {
      console.log("Tentando excluir grupo com ID:", grupoId);
      await api.delete(`/Grupos/${grupoId}`);
      alert("Grupo excluído com sucesso!");
      await carregarGrupos(); // Recarrega a lista de grupos após exclusão
    } catch (err) {
      if (err.response) {
        console.error("Erro ao excluir grupo (Resposta do servidor):", 
          "Status:", err.response.status, 
          "Dados:", err.response.data, 
          "Headers:", err.response.headers
        );
        alert(`Erro ao excluir grupo: ${err.response.status} - ${err.response.data?.message || 'Erro desconhecido do servidor.'}`);
      } else if (err.request) {
        console.error("Erro ao excluir grupo (Erro de rede/CORS): Nenhuma resposta recebida do servidor.", err.message);
        alert("Erro de conexão ao servidor ao excluir grupo. Verifique se o backend C# está rodando e o CORS configurado.");
      } else {
        console.error("Erro ao excluir grupo (Erro desconhecido):", err.message);
        alert("Erro interno ao excluir grupo.");
      }
    }
  };

  return (
    <div className="grupos-container">
      <h4>Grupos</h4>

      <div className="grupo-lista">
        {loadingGrupos ? (
          <p>Carregando grupos...</p>
        ) : erroGrupos ? (
          <p className="error-message">Erro ao carregar grupos.</p>
        ) : grupos.length === 0 ? (
          <p>Nenhum grupo encontrado.</p>
        ) : (
          grupos.map((grupo) => (
            <div key={grupo.id} className="grupo-item">
              <GrupoBotao
                nome={grupo.nome}
                ativo={grupoSelecionado === grupo.nome}
                onClick={() => setGrupoSelecionado(grupo.nome)}
              />
              {isAdmin() && ( // Ações de edição/exclusão apenas para administradores
                <div className="grupo-actions">
                  <button onClick={() => abrirModalGrupo(grupo)}>✏️</button> {/* Botão de editar */}
                  <button onClick={() => excluirGrupo(grupo.id)}>🗑️</button> {/* Botão de excluir */}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isAdmin() && ( // Botão "Novo Grupo" apenas para administradores
        <button className="custom-btn" onClick={() => abrirModalGrupo(null)}>
          + Novo Grupo
        </button>
      )}

      {/* Renderiza o modal se modalAberto for true */}
      {modalAberto && (
        <ModalGrupo
          nome={nomeGrupo}
          setNome={setNomeGrupo}
          onClose={() => setModalAberto(false)}
          onSave={salvarGrupo} // Passa a função salvarGrupo para o modal
        />
      )}
    </div>
  );
}

export default SidebarGrupos;