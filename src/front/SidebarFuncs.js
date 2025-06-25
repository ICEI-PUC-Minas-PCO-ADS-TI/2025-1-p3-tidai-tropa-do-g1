// src/front/SidebarFuncs.js
import { useState, useEffect } from "react";
import api from "../services/api";

export function useGrupos(organizacaoId) {
  const [grupos, setGrupos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarGrupos = async () => {
    try {
      const response = await api.get("/Grupos");
      const filtrados = response.data.filter(
        (g) => g.organizacaoId === organizacaoId
      );
      setGrupos(filtrados);
    } catch (err) {
      console.error("Erro ao carregar grupos:", err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (organizacaoId) carregarGrupos();
  }, [organizacaoId]);

  return { grupos, setGrupos, carregarGrupos, carregando };
}
