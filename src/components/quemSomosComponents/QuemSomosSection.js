import React from "react";
import "../../styles/stylesQuem/QuemSomosSection.css";

function QuemSomosSection() {
  return (
    <section className="quem-somos-section">
      <div className="quem-somos-container">
        <h1 className="quem-somos-title">Quem Somos</h1>

        <p className="quem-somos-text">
          A <strong>Crows Inteligência Ampliada</strong> é uma iniciativa nascida da paixão por tecnologia, inovação e soluções inteligentes. Nosso objetivo é criar aplicações modernas, funcionais e acessíveis que realmente façam a diferença no dia a dia das pessoas.
        </p>

        <p className="quem-somos-text">
          A equipe é formada por estudantes dedicados, movidos pela vontade de aprender e evoluir no universo do desenvolvimento de software. Trabalhamos com princípios de front-end, back-end, design de interface e experiência do usuário, sempre com foco em qualidade, clareza e usabilidade.
        </p>

        <h2 className="quem-somos-subtitle">Nosso Time</h2>

        <ul className="quem-somos-lista">
          <li><strong>Igor Maia</strong> — Desenvolvedor Front-End</li>
          <li><strong>Victor Schneider</strong> — Desenvolvedor Back-End</li>
          <li><strong>Luis Sampaio</strong> — Desenvolvedor Back-End</li>
          <li><strong>Igor Pereira</strong> — Desenvolvedor Front-End</li>
          <li><strong>Thiago Moreira</strong> — Desenvolvedor Back-End</li>
        </ul>

        <p className="quem-somos-text">
          Juntos, voamos além do código, criando experiências que impactam, informam e conectam.
        </p>
      </div>
    </section>
  );
}

export default QuemSomosSection;
