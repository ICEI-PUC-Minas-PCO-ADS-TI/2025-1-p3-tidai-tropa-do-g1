import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import "../styles/Sidebar.css";

function Sidebar({ userImage, setUserImage }) {
  const [openMenus, setOpenMenus] = useState({
    financeiro: false,
    notasFiscais: false,
    fornecedores: false,
  });

  const [showProfileModal, setShowProfileModal] = useState(false);

  // Dados do perfil
  const [userInfo, setUserInfo] = useState({
    nome: "Nome User",
    foto: "/user.png",
  });

  // Atualiza os dados quando o modal for fechado
  useEffect(() => {
    const nome = localStorage.getItem("perfil_nome") || "Nome User";
    const foto = localStorage.getItem("perfil_foto") || "/user.png";
    setUserInfo({ nome, foto });
  }, [showProfileModal]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src="/grupo.png" alt="Grupo" className="icon-left" />
        <FaCog
          className="icon-right gear-icon"
          onClick={() => setShowProfileModal(true)}
        />
      </div>

      <div className="user-info">
        <img src={userImage} alt="Avatar do Usuário" className="user-avatar" />

        <h3>{userInfo.nome}</h3>
        <p>PUC Minas</p>
        <p>Administrador</p>
        <button className="btn-gerenciar">Gerenciar Arquivos</button>
      </div>

      <div className="menu">
        <ul>
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
        </ul>
      </div>

      {showProfileModal && (
        <ProfileModal
          onClose={() => setShowProfileModal(false)}
          userImage={userImage}
          setUserImage={setUserImage}
        />
      )}
    </div>
  );
}

export default Sidebar;
