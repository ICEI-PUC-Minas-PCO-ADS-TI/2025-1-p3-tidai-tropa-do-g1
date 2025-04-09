import React, { useState } from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  const [openMenus, setOpenMenus] = useState({
    financeiro: false,
    notasFiscais: false,
    fornecedores: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src="/grupo.png" alt="Grupo" className="icon-left" />
        <img src="/config.png" alt="Configuração" className="icon-right" />
      </div>
      <div className="user-info">
        <img src="/user.png" alt="Avatar do Usuário" className="user-avatar" />
        <h3>Nome User</h3>
        <p>PUC Minas</p>
        <p>Administrador</p>
        <button className="btn-gerenciar">Gerenciar Arquivos</button>
      </div>

      <div className="menu">
        <ul>
          {/* Financeiro */}
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
              {/* Notas Fiscais */}
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
                    <img src="/arquivo-pdf.png" alt="icone" />
                    NF_01.pdf
                  </li>
                  <li>
                    <img src="/arquivo-pdf.png" alt="icone" />
                    NF_02.pdf
                  </li>
                  <li>
                    <img src="/arquivo-pdf.png" alt="icone" />
                    NF_03.pdf
                  </li>
                </ul>
              )}

              {/* Fornecedores */}
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
                    <img src="/arquivo-excel.png" alt="icone" />
                    CoraçãoEucaristico.xls
                  </li>
                  <li>
                    <img src="/arquivo-excel.png" alt="icone" />
                    Contagem.xls
                  </li>
                  <li>
                    <img src="/arquivo-excel.png" alt="icone" />
                    PraçaDaLiberdade.xls
                  </li>
                </ul>
              )}
            </ul>
          )}

          {/* Outros menus */}
          <li>
            <img src="/pra-cima.png" alt="icone" />
            Jurídico
          </li>
          <li>
            <img src="/pra-cima.png" alt="icone" />
            Suprimentos
          </li>
          <li>
            <img src="/pra-cima.png" alt="icone" />
            Controladoria
          </li>
          <li>
            <img src="/pra-cima.png" alt="icone" />
            TI
          </li>
          <li>
            <img src="/pra-cima.png" alt="icone" />
            Projetos
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
