import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Importa a instância do Axios
import "../styles/ProfileModal.css"; // Seus estilos CSS para o modal

function ProfileModal({ onClose, userImage, setUserImage }) {
  const navigate = useNavigate();

  // Obtém os dados do usuário logado e o tipo de perfil do localStorage
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const tipoPerfilLogado = localStorage.getItem("tipoPerfil"); // 'admin' ou 'usuario'

  // Estados locais para os campos do formulário (nome e email agora apenas para exibicao/payload, nao editaveis)
  const [id, setId] = useState(usuarioLogado?.id || "");
  const [nome, setNome] = useState(usuarioLogado?.nome || ""); // Mantido para carregar o nome original
  const [email, setEmail] = useState(usuarioLogado?.email || ""); // Mantido para carregar o email original
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [fotoPreview, setFotoPreview] = useState(
    usuarioLogado?.foto || usuarioLogado?.imagemPerfil || userImage || "" // Pega foto de usuário ou imagemPerfil de organização
  );

  // Efeito para sincronizar a fotoPreview com userImage no componente pai
  useEffect(() => {
    setUserImage(fotoPreview);
  }, [fotoPreview, setUserImage]);

  // Efeito para carregar os dados iniciais do usuário/organização no modal
  useEffect(() => {
    if (usuarioLogado) {
      setId(usuarioLogado.id);
      setNome(usuarioLogado.nome || "");
      setEmail(usuarioLogado.email || "");
      setFotoPreview(
          usuarioLogado.imagemPerfil ||
          "/user.png"
      );
    } else {
      // Se não há dados logados, redireciona para a tela de login
      alert("Sessão expirada ou usuário não logado. Faça login novamente.");
      navigate("/");
    }
  }, [usuarioLogado, navigate]); // Dependências: re-executa se usuarioLogado mudar ou navigate mudar

  // Lida com a seleção de arquivo para a imagem de perfil
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file); // Converte a imagem para Base64
    }
  }

  // Função para fazer logout
  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("tipoPerfil");
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
  }

  // Lógica principal para salvar as alterações (foco na senha e foto)
  async function handleSalvar() {
    try {
      // 1. Validação da Senha Antiga (via POST no Backend)
      if (!senhaAntiga) {
        alert("Por favor, insira sua senha atual para confirmar.");
        return;
      }

      // Prepara as credenciais para validar a senha antiga no backend
      const loginCredentials = {
        email: usuarioLogado.email.toLowerCase(),
        senha: senhaAntiga,
        organizacao: usuarioLogado.organizacao?.nome || "", // Usa o nome da organização associada ao usuário logado
        tipoUsuario: tipoPerfilLogado === "admin" ? "Admin" : "Comum", // Passa o tipo de perfil atual
      };

      try {
        // Envia as credenciais para o endpoint de login do backend para validar a senha antiga
        await api.post("/usuarios/login", loginCredentials);
        // Se a requisição acima não lançar erro, a senha antiga está correta.
      } catch (loginError) {
        // Se houver um erro, a senha antiga está incorreta
        console.error(
          "Validação de senha antiga falhou:",
          loginError.response?.data || loginError.message
        );
        alert(
          "Senha atual incorreta ou erro na validação. Por favor, tente novamente."
        );
        return;
      }

      // 2. Preparar o Payload para a Atualização (PUT)
      // Ajusta o payload e o endpoint baseado no tipo de perfil logado (Admin ou Usuário Comum)
      let payload = { ...usuarioLogado }; // Começa com todos os dados atuais do usuário/organização

      let endpoint = "";

      if (tipoPerfilLogado === "admin") {
        // Se for ADMIN, o PUT é para o recurso da ORGANIZAÇÃO
        payload = {
          ...usuarioLogado, // Mantém todos os campos originais da organização
          senha: senhaNova ? senhaNova : senhaAntiga, // Atualiza a senha da organização (backend DEVE hashear)
          imagemPerfil: fotoPreview, // Atualiza a imagem de perfil da organização
          // 'nome' e 'email' são mantidos do usuarioLogado e não são alterados via input
        };
        endpoint = `/Organizacoes/${id}`; // Endpoint PUT para Organizações (usa o ID da organização)
      } else {
        // Se for USUÁRIO COMUM, o PUT é para o recurso do USUÁRIO
        payload = {
          ...usuarioLogado, // Mantém todos os campos originais do usuário
          senha: senhaNova ? senhaNova : senhaAntiga, // Atualiza a senha do usuário (backend DEVE hashear)
          foto: fotoPreview, // Atualiza a foto de perfil do usuário
          // 'nome' e 'email' são mantidos do usuarioLogado e não são alterados via input
        };
        endpoint = `/Usuarios/${id}`; // Endpoint PUT para Usuários (usa o ID do usuário)
      }

      // 3. Chamar a API para Atualizar o Perfil
      console.log(`Enviando payload de atualização para ${endpoint}:`, payload);
      const updateResponse = await api.put(endpoint, payload);

      // 4. Atualizar localStorage e Exibir Sucesso
      // O backend deve retornar o objeto atualizado (usuário ou organização)
      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(updateResponse.data)
      );

      alert("Perfil atualizado com sucesso!");
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      let displayMessage =
        "Erro ao atualizar perfil. Verifique suas informações.";
      if (error.response) {
        const serverData = error.response.data;
        if (serverData && typeof serverData === "string") {
          displayMessage = serverData;
        } else if (serverData && serverData.errors) {
          displayMessage =
            "Erros de validação:\n" +
            Object.values(serverData.errors).flat().join("\n");
        } else if (serverData && serverData.message) {
          displayMessage = serverData.message;
        } else {
          displayMessage = `Erro do servidor (Status ${error.response.status}): ${error.response.statusText}`;
        }
      } else if (error.message) {
        displayMessage = `Erro de comunicação: ${error.message}`;
      }
      alert(displayMessage);
    }
  }

  // Renderização do modal de perfil
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Perfil</h2>
        <div className="foto-container">
          <img
            src={fotoPreview || "https://via.placeholder.com/150"}
            alt="Foto de Perfil"
            className="foto-preview"
          />
          <input type="file" onChange={handleImageChange} />
        </div>
        {/* CAMPOS DE NOME E EMAIL REMOVIDOS PARA EDICAO */}
        {/* Agora sao apenas labels de exibicao */}
        <label>Nome:</label>
        <p>{nome}</p> {/* Exibe o nome, mas nao permite edicao */}
        <label>Email:</label>
        <p>{email}</p> {/* Exibe o email, mas nao permite edicao */}
        <label>Senha atual:</label>
        <input
          type="password"
          placeholder="Senha atual"
          value={senhaAntiga}
          onChange={(e) => setSenhaAntiga(e.target.value)}
        />
        <label>Nova senha:</label>
        <input
          type="password"
          placeholder="Nova senha (ou deixe em branco)"
          value={senhaNova}
          onChange={(e) => setSenhaNova(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="btn-salvar" onClick={handleSalvar}>
            Salvar
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
          <button className="btn-fechar" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
