import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Seu cliente Axios/Fetch para o backend C#
import "../styles/ProfileModal.css";

function ProfileModal({ onClose, userImage, setUserImage }) {
  const navigate = useNavigate();
  // Garante que usuarioLogado seja um objeto, mesmo que localStorage esteja vazio ou inválido
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || '{}');
  const tipoPerfilLogado = localStorage.getItem("tipoPerfil"); // 'usuario' ou 'organizacao'

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [fotoPreview, setFotoPreview] = useState(""); // URL/Base64 da foto
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [statusMessage, setStatusMessage] = useState(""); // Mensagem de feedback
  const [messageType, setMessageType] = useState(""); // Tipo de mensagem (success/error)

  // Atualiza userImage no pai quando fotoPreview muda
  useEffect(() => {
    setUserImage(fotoPreview);
  }, [fotoPreview, setUserImage]);

  // Efeito para carregar os dados iniciais do usuário/organização no modal
  useEffect(() => {
    if (usuarioLogado && usuarioLogado.id) { // Verifica se usuarioLogado e ID existem
      setId(usuarioLogado.id);
      setNome(usuarioLogado.nome || "");
      setEmail(usuarioLogado.email || "");
      setFotoPreview(
        usuarioLogado.foto || // Se tiver 'foto' diretamente
        usuarioLogado.imagemPerfil || // Se tiver 'imagemPerfil'
        "https://via.placeholder.com/150" // Placeholder padrão
      );
    } else {
      alert("Sessão expirada ou usuário não logado. Faça login novamente.");
      navigate("/"); // Redireciona para a tela de login
    }
  }, [usuarioLogado, navigate]); 

  // Lida com a seleção de arquivo para a imagem de perfil
  const handleImageChange = (e) => { // Tornada const
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result); // Armazena a imagem em Base64
      };
      reader.readAsDataURL(file); // Converte a imagem para Base64
    }
  };

  // --- FUNÇÃO handleSalvar: Lógica para SALVAR o perfil ---
  const handleSalvar = async () => { // Tornada const e assíncrona
    // 1. Validações básicas
    if (!nome.trim() || !email.trim()) {
      setStatusMessage("Nome e Email são obrigatórios.");
      setMessageType("error");
      return;
    }

    if (senhaAntiga && !usuarioLogado.senha) {
        setStatusMessage("Senha antiga não encontrada no registro de usuário logado. Não é possível validar.");
        setMessageType("error");
        return;
    }
    
    // Supondo que a senha antiga no usuarioLogado é a senha hash/criptografada para comparação
    // e que a API C# valide isso. Ou, se for texto puro, compare diretamente.
    // Se a senha antiga for fornecida, ela deve bater com a senha atual (do usuarioLogado ou validada pelo backend C#)
    // E se houver senha nova, a senha antiga é obrigatória
    if (senhaNova && (!senhaAntiga || senhaAntiga !== usuarioLogado.senha)) { 
        setStatusMessage("Senha antiga incorreta. Não foi possível atualizar a senha.");
        setMessageType("error");
        return;
    }
    
    setIsLoading(true);
    setStatusMessage("Salvando alterações...");
    setMessageType("info");

    try {
      // 2. Montar o payload (dados a serem enviados para a API C#)
      // Ajuste o payload conforme seu backend C# espera.
      // Assumimos que o backend C# espera um objeto com os dados do usuário/organização.
      // O 'id' deve ser incluído para PUT (atualização).
      const payload = {
        id: id,
        nome: nome,
        email: email,
        senha: senhaNova || undefined, // Envia senhaNova apenas se ela existir, senão undefined
        // A imagem em Base64 pode ser enviada se o backend a processar
        imagemPerfil: fotoPreview, // Envia a foto em Base64
        // Outros campos de usuarioLogado que nao estao no formulario, mas sao necessarios para o PUT completo
        // Assumindo que o backend C# eh tolerante a campos nao fornecidos ou que voce manda o objeto completo
        ...usuarioLogado, // Mescla todos os dados existentes do usuarioLogado
        nome: nome, // Sobrescreve o nome existente com o novo
        email: email, // Sobrescreve o email existente com o novo
        // Nao sobrescrever a senha antiga aqui se for para hash.
        // O backend C# deve lidar com a validacao da senha antiga e hash da nova.
      };
      
      // Remover campos sensiveis ou desnecessários para o payload se o backend não os espera
      delete payload.senhaAntiga; // Nao enviar a senha antiga para o backend
      // delete payload.organizacao; // Se o backend nao espera o objeto organizacao no payload de usuario

      // 3. Determinar o endpoint da API com base no tipo de perfil
      let endpoint = "";
      if (tipoPerfilLogado === "usuario") {
        endpoint = `/Usuarios/${id}`;
      } else if (tipoPerfilLogado === "organizacao") {
        endpoint = `/Organizacoes/${id}`; // Assumindo endpoint para organização
      } else {
        throw new Error("Tipo de perfil desconhecido.");
      }

      // 4. Fazer a requisição PUT para atualizar
      console.log(`Enviando PUT para ${endpoint} com payload:`, payload);
      const response = await api.put(endpoint, payload);

      // 5. Atualizar localStorage e estados após sucesso
      // É crucial atualizar o localStorage com os novos dados
      const updatedUser = { 
        ...usuarioLogado, 
        nome: nome, 
        email: email, 
        imagemPerfil: fotoPreview 
      };
      if (senhaNova) {
        // Se a senha foi alterada e validada pelo backend, voce pode querer limpar senhaNova
        // ou, se o backend retornar o novo hash, salva-lo aqui.
        // Por seguranca, geralmente nao se salva a senha nova no localStorage.
      }
      localStorage.setItem("usuarioLogado", JSON.stringify(updatedUser));

      setStatusMessage("Perfil atualizado com sucesso!");
      setMessageType("success");
      console.log("Resposta da API:", response.data);
    } catch (err) {
      console.error("Erro detalhado ao salvar perfil:", err.response?.data || err.message);
      setStatusMessage(`Erro ao salvar perfil: ${err.response?.data?.message || err.message || 'Erro desconhecido.'}`);
      setMessageType("error");
    } finally {
      setIsLoading(false); // Finaliza o carregamento
      setSenhaAntiga(""); // Limpa o campo de senha antiga
      setSenhaNova(""); // Limpa o campo de nova senha
    }
  };

  // Função para fazer logout
  const handleLogout = () => { // Tornada const
    localStorage.removeItem("authToken");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoPerfil");
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Perfil</h2>
        <div className="foto-container">
          <img
            src={fotoPreview}
            alt="Foto de Perfil"
            className="foto-preview"
          />
          <input
            type="file"
            accept="image/*" // Aceita apenas arquivos de imagem
            onChange={handleImageChange}
            className="file-input-hidden" // Para estilizar o input de arquivo
            id="imageUpload" // ID para o label
          />
          <label htmlFor="imageUpload" className="upload-photo-label">
            Trocar Foto
          </label>
        </div>

        <label htmlFor="nomeInput">Nome:</label>
        <input 
          id="nomeInput"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={isLoading}
        />

        <label htmlFor="emailInput">Email:</label>
        <input 
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <label htmlFor="senhaAntigaInput">Senha atual:</label>
        <input
          id="senhaAntigaInput"
          type="password"
          placeholder="Senha atual"
          value={senhaAntiga}
          onChange={(e) => setSenhaAntiga(e.target.value)}
          disabled={isLoading}
        />

        <label htmlFor="senhaNovaInput">Nova senha:</label>
        <input
          id="senhaNovaInput"
          type="password"
          placeholder="Nova senha (opcional)"
          value={senhaNova}
          onChange={(e) => setSenhaNova(e.target.value)}
          disabled={isLoading}
        />

        {statusMessage && ( // Exibe a mensagem de status
          <div className={`status-message ${messageType}`}>
            {statusMessage}
          </div>
        )}

        <div className="modal-buttons">
          <button className="btn-salvar" onClick={handleSalvar} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
          <button className="btn-logout" onClick={handleLogout} disabled={isLoading}>
            Logout
          </button>
          <button className="btn-fechar" onClick={onClose} disabled={isLoading}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;