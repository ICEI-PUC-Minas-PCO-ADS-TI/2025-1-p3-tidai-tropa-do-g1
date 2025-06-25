// src/components/usuariosComponents/SidebarGrupos.jsx
import React, { useState } from "react";
import "../../styles/stylesUsuarios/SidebarGrupos.css";
import GrupoBotao from "./GrupoBotao";
import { useGrupos } from "../../front/SidebarFuncs";
import ModalGrupo from "../usuariosComponents/ModalGrupo";
import api from "../../services/api"; // Assumimos que 'api' é uma instância do Axios ou similar

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
  const [grupos, setGrupos] = useState([]);
  // Garante que usuarioLogado seja um objeto, mesmo que localStorage esteja vazio ou inválido
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || '{}');

  useEffect(() => {
    // Verifica se usuarioLogado.organizacaoId existe antes de tentar carregar
    if (usuarioLogado) {
      carregarGrupos();
    } else {
      console.warn("usuarioLogado ou organizacaoId não encontrados no localStorage. Não foi possível carregar grupos.");
      // Opcional: exibir mensagem para o usuário ou redirecionar para login
    }
  }, [usuarioLogado.organizacaoId]); // Recarrega se o ID da organização mudar

  const carregarGrupos = async () => {
    try {
      // Adiciona um log antes da requisição para ter certeza de que ela está sendo feita
      console.log("Tentando carregar grupos para organização:", usuarioLogado.organizacaoId);

      const response = await api.get("/Grupos"); // Faz a requisição GET
      
      // Adiciona um log para ver a resposta bruta do servidor
      console.log("Resposta da API /Grupos:", response.data);

      const gruposFiltrados = response.data.filter(
        (g) => g.organizacaoId === usuarioLogado.id
      );
      setGrupos(gruposFiltrados);
      console.log("Grupos filtrados e carregados:", gruposFiltrados);

    } catch (err) {
      console.error("Erro ao salvar grupo:", err);
      alert("Erro ao salvar grupo.");
      return false;
    }
  };

  const excluirGrupo = async (grupoId) => {
    if (!window.confirm("Tem certeza que deseja excluir este grupo?")) return;
      // Tratamento de erro aprimorado para depuração
      if (err.response) {
        // Erro vindo do servidor (status code 4xx ou 5xx)
        // Por exemplo, 404 Not Found, 401 Unauthorized, 500 Internal Server Error
        console.error("Erro ao buscar grupos (Resposta do servidor):", 
          "Status:", err.response.status, 
          "Dados:", err.response.data, 
          "Headers:", err.response.headers
        );
        alert(`Erro ao carregar grupos: ${err.response.status} - ${err.response.data?.message || 'Erro desconhecido do servidor.'}`);
      } else if (err.request) {
        // Erro de requisição (ex: sem resposta do servidor, erro de rede, CORS bloqueado)
        // Isso acontece quando a requisição foi feita, mas nenhuma resposta foi recebida.
        // O erro CORS geralmente se manifesta aqui, como 'TypeError: Failed to fetch' ou 'Network Error'.
        console.error("Erro ao buscar grupos (Erro de rede/CORS): Nenhuma resposta recebida do servidor.", err.message);
        alert("Erro de conexão ao servidor. Verifique se o backend C# está rodando, se a URL da API está correta e se o CORS está configurado.");
      } else {
        // Outros erros que podem ter ocorrido ao configurar a requisição (ex: erro no código do frontend)
        console.error("Erro ao buscar grupos (Erro desconhecido):", err.message);
        alert("Erro interno ao carregar grupos.");
      }
    }
  };

  const criarGrupo = async () => {
    // ... (restante da função criarGrupo, sem alterações aqui) ...
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
