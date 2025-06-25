import { useState, useEffect } from "react";
import api from "../services/api";

export function useUsuarios(organizacaoId) {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarUsuarios = async () => {
    try {
      const response = await api.get("/Usuarios");
      const filtrados = response.data.filter(
        (u) => u.organizacaoId === organizacaoId
      );
      setUsuarios(filtrados);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setCarregando(false);
    }
  };

  const criarUsuario = async (usuario) => {
    try {
      const response = await api.post("/Usuarios", usuario);
      return response.data;
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      throw err;
    }
  };

  const atualizarUsuario = async (id, usuario) => {
    try {
      const response = await api.put(`/Usuarios/${id}`, usuario);
      return response.data;
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      throw err;
    }
  };

  const deletarUsuario = async (id) => {
    try {
      await api.delete(`/Usuarios/${id}`);
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (organizacaoId) carregarUsuarios();
  }, [organizacaoId]);

  return {
    usuarios,
    carregarUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    carregando,
  };
}
