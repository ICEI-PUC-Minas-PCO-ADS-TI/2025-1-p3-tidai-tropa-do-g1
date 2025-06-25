import React, { useState, useEffect } from "react";
import "../../styles/stylesUsuarios/PainelUsuarios.css";
import { useUsuarios } from "../../front/UsuarioFuncs";

function ModalUsuario({ usuario, grupoSelecionado, onClose, onSalvo }) {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const { criarUsuario, atualizarUsuario, deletarUsuario } = useUsuarios(
    usuarioLogado?.id
  );

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  // Se editar, usa tipo do usuário; se criar, usa grupoSelecionado como tipoUsuario padrão
  const [tipoUsuario, setTipoUsuario] = useState(grupoSelecionado || "");

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome || "");
      setEmail(usuario.email || "");
      setSenha(""); // não preencher senha no editar
      setTipoUsuario(usuario.tipoUsuario || grupoSelecionado || "");
    } else {
      setNome("");
      setEmail("");
      setSenha("");
      setTipoUsuario(grupoSelecionado || "");
    }
  }, [usuario, grupoSelecionado]);

  const handleSalvar = async (e) => {
    e.preventDefault();

    if (!nome || !email || (!usuario && !senha) || !tipoUsuario) {
      alert("Preencha todos os campos.");
      return;
    }

    const payload = {
      nome,
      email,
      senha: senha || (usuario ? usuario.senha : ""),
      tipoUsuario, // já vem do grupo selecionado se for novo
      organizacaoId: usuarioLogado.id,
      ativo: true,
      documento: usuario?.documento || "",
      tipoDocumento: usuario?.tipoDocumento || "CPF",
      dataNascimento: usuario?.dataNascimento || new Date().toISOString(),
    };

    try {
      if (usuario) {
        await atualizarUsuario(usuario.id, payload);
        alert("Usuário atualizado com sucesso!");
      } else {
        await criarUsuario(payload);
        alert("Usuário criado com sucesso!");
      }
      onSalvo();
    } catch (err) {
      alert("Erro ao salvar usuário.");
    }
  };

  const handleExcluir = async () => {
    if (!usuario) return;
    if (!window.confirm("Deseja realmente excluir este usuário?")) return;

    try {
      await deletarUsuario(usuario.id);
      alert("Usuário excluído com sucesso!");
      onSalvo();
    } catch (err) {
      alert("Erro ao excluir usuário.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{usuario ? "Editar Usuário" : "Novo Usuário"}</h3>
        <form onSubmit={handleSalvar} className="modal-form">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            autoFocus
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder={usuario ? "Deixe vazio para manter" : ""}
            required={!usuario}
          />

          <label>Tipo de Usuário:</label>
          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Administrador">Administrador</option>
            <option value="Financeiro">Financeiro</option>
            <option value="TI">TI</option>
            <option value="RH">RH</option>
          </select>

          <div className="modal-buttons">
            <button type="submit" className="btn-salvar">
              Salvar
            </button>
            {usuario && (
              <button
                type="button"
                className="btn-excluir"
                onClick={handleExcluir}
              >
                Excluir
              </button>
            )}
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalUsuario;
