import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import UploadModal from "../back/UploadModal";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const API_BASE_URL = 'http://localhost:8000'; 

function Sidebar({ userImage, setUserImage }) {
  const [openMenus, setOpenMenus] = useState({
    financeiro: false,
    notasFiscais: false,
    fornecedores: false,
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [userInfo, setUserInfo] = useState({
    nome: "Convidado", // Nome padrão até carregar
    foto: "/user.png", // Foto padrão
    id: null, // ID padrão, importante que seja null/0 até carregar
    perfil: "Visitante",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioLogado");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo({
          // Prioriza o que vem do localStorage, mas mantem defaults seguros
          nome: parsedUser.nome || "Usuário",
          foto: parsedUser.imagemPerfil || "/user.png",
          id: parsedUser.id || null, // Importante para o UploadModal
          perfil: "Administrador da Organização", // Ou um perfil default
        });
      } catch (e) {
        console.error("Erro ao parsear usuarioLogado do localStorage:", e);
        // Em caso de erro de parse, reset para um estado seguro
        setUserInfo({ nome: "Erro ao carregar", foto: "/user.png", id: null, perfil: "Erro" });
      }
    } else {

        setUserInfo(prev => ({ ...prev, nome: "Nome User", foto: "/user.png" }));
    }
  }, [showProfileModal]); // Recarrega se o modal de perfil fechar (possivelmente mudou o nome/foto)


  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const navigate = useNavigate();

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
        <img src={userImage} alt="Avatar do Usuário" className="user-avatar" />
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
        {/* <ul>
          <li onClick={() => toggleMenu("financeiro")} className="menu-item">
            <img
              src={
                openMenus.financeiro ? "/seta-para-baixo.png" : "/pra-cima.png"
              }
              alt="icone"
            />
            Financeiro
          </li>
          {openMenus.financeiro && (
            <ul className="submenu">
              <li
                onClick={() => toggleMenu("notasFiscais")}
                className="menu-item"
              >
                <img
                  src={
                    openMenus.notasFiscais
                      ? "/seta-para-baixo.png"
                      : "/pra-cima.png"
                  }
                  alt="icone"
                />
                Notas Fiscais
              </li>
              {openMenus.notasFiscais && (
                <ul className="sub-submenu">
                  <li>
                    <img src="/arquivo-pdf.png" alt="icone" /> NF_01.pdf
                  </li>
                  <li>
                    <img src="/arquivo-pdf.png" alt="icone" /> NF_02.pdf
                  </li>
                  <li>
                    <img src="/arquivo-pdf.png" alt="icone" /> NF_03.pdf
                  </li>
                </ul>
              )}
              <li
                onClick={() => toggleMenu("fornecedores")}
                className="menu-item"
              >
                <img
                  src={
                    openMenus.fornecedores
                      ? "/seta-para-baixo.png"
                      : "/pra-cima.png"
                  }
                  alt="icone"
                />
                Fornecedores
              </li>
              {openMenus.fornecedores && (
                <ul className="sub-submenu">
                  <li>
                    <img src="/arquivo-excel.png" alt="icone" />{" "}
                    CoraçãoEucaristico.xls
                  </li>
                  <li>
                    <img src="/arquivo-excel.png" alt="icone" /> Contagem.xls
                  </li>
                  <li>
                    <img src="/arquivo-excel.png" alt="icone" />{" "}
                    PraçaDaLiberdade.xls
                  </li>
                </ul>
              )}
            </ul>
          )}
          <li>
            <img src="/pra-cima.png" alt="icone" /> Jurídico
          </li>
          <li>
            <img src="/pra-cima.png" alt="icone" /> Suprimentos
          </li>
          <li>
            <img src="/pra-cima.png" alt="icone" /> Controladoria
          </li>
          <li>
            <img src="/pra-cima.png" alt="icone" /> TI
          </li>
          <li>
            <img src="/pra-cima.png" alt="icone" /> Projetos
          </li>
        </ul> */}
      </div>

      {showProfileModal && (
        <ProfileModal
          onClose={() => setShowProfileModal(false)}
          userImage={userImage}
          setUserImage={setUserImage}
        />
      )}

      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} 
          userId={userInfo.id}
        />
      )}
    </div>
  );
}

export default Sidebar;
