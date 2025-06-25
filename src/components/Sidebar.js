import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import UploadModal from "../back/UploadModal";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import '../styles/UploadModal.css'; 

const API_BASE_URL = 'http://localhost:8000'; 

function Sidebar({ userImage, setUserImage }) {
  const [openMenus, setOpenMenus] = useState({
    financeiro: false,
    notasFiscais: false,
    fornecedores: false,
    meusDocumentos: false, // <-- Certifique-se que este menu também existe
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [userInfo, setUserInfo] = useState({
    nome: "Convidado",
    foto: "/user.png",
    id: null,
    perfil: "Visitante",
    organizacaoId: null,
  });

  const [userDocuments, setUserDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [errorLoadingDocuments, setErrorLoadingDocuments] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioLogado");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo({
          nome: parsedUser.nome || "Usuário",
          foto: parsedUser.foto || "/user.png",
          id: parsedUser.id || null, 
          perfil: parsedUser.perfil || "Administrador",
          organizacaoId: parsedUser.organizacaoId || null,
        });
      } catch (e) {
        console.error("Erro ao parsear usuarioLogado do localStorage:", e);
        setUserInfo(prev => ({ ...prev, nome: "Erro ao carregar", id: null }));
      }
    }
  }, [showProfileModal]);

  useEffect(() => {
    const loadUserDocuments = async () => {
      if (userInfo.id === null) {
        setLoadingDocuments(false);
        return;
      }
      setLoadingDocuments(true);
      setErrorLoadingDocuments(null);
      try {
        const response = await fetch(`${API_BASE_URL}/documents/list/${userInfo.id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Falha ao carregar documentos do usuário.');
        }
        const data = await response.json();
        setUserDocuments(data);
      } catch (error) {
        console.error("Erro ao carregar documentos do usuário:", error);
        setErrorLoadingDocuments(error.message);
        setUserDocuments([]);
      } finally {
        setLoadingDocuments(false);
      }
    };

    loadUserDocuments();
  }, [userInfo.id]);


  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const navigate = useNavigate();

  // --- NOVA FUNÇÃO PARA OBTER O CAMINHO DO ÍCONE ---
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return "/arquivo-pdf.png"; // Certifique-se que este caminho está correto
      case 'docx':
      case 'doc':
        return "/arquivo-docx.png"; // Certifique-se que este caminho está correto (ex: /public/arquivo-word.png)
      case 'txt':
        return "/arquivo-txt.png"; // Certifique-se que este caminho está correto
      case 'xlsx':
      case 'xls':
        return "/arquivo-excel.png"; // Se você tiver um ícone para Excel
      case 'csv':
        return "/arquivo-csv.png"; // Se você tiver um ícone para CSV
      default:
        return "/arquivo-desconhecido.png"; // Ícone padrão para outros tipos ou desconhecidos
    }
  };


  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img
          src="/grupo.png"
          alt="Grupo"
          className="icon-left"
          onClick={() => navigate("/usuarios")}
        />
        <FaCog
          className="icon-right gear-icon"
          onClick={() => setShowProfileModal(true)}
        />
      </div>

      <div className="user-info">
        <img src={userInfo.foto} alt="Avatar do Usuário" className="user-avatar" />
        <h3>{userInfo.nome}</h3>
        <p>{userInfo.nome}</p>
        <p>{userInfo.perfil}</p>
        <button
          className="btn-gerenciar"
          onClick={() => setShowUploadModal(true)}
        >
          Adicionar Arquivos
        </button>
      </div>

      <div className="menu">
        {/* ... (Seu menu existente) ... */}
        
        {/* Adicionando a seção de Meus Documentos */}
        <li onClick={() => toggleMenu("meusDocumentos")} className="menu-item">
            <img 
                src={openMenus.meusDocumentos ? "/seta-para-baixo.png" : "/pra-cima.png"} 
                alt="icone" 
            />
            Meus Documentos
        </li>
        {openMenus.meusDocumentos && (
            <ul className="submenu">
                {loadingDocuments ? (
                    <li>Carregando documentos...</li>
                ) : errorLoadingDocuments ? (
                    <li className="error-message">Erro ao carregar documentos.</li>
                ) : userDocuments.length === 0 ? (
                    <li>Nenhum documento encontrado.</li>
                ) : (
                    userDocuments.map(doc => (
                        <li key={doc.id}>
                            {/* <img src="/arquivo-pdf.png" alt="icone" /> REMOVIDO/COMENTADO */}
                            <img src={getFileIcon(doc.nome_arquivo)} alt="Ícone do Documento" className="document-icon" /> {/* <-- MUDANÇA AQUI */}
                            {doc.nome_arquivo}
                        </li>
                    ))
                )}
            </ul>
        )}
      </div>

      {showProfileModal && (
        <ProfileModal
          onClose={() => setShowProfileModal(false)}
          userImage={userImage}
          setUserImage={setUserImage}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}

      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)} 
          userId={userInfo.id} 
        />
      )}
    </div>
  );
}

export default Sidebar;