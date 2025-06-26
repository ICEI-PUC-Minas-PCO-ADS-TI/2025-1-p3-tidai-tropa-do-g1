# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="04-Projeto-interface.md"> Projeto de interface</a></span>

A arquitetura da CrowsIA descreve sua estrutura robusta e moderna, incluindo seus componentes e o ambiente de hospedagem.

A CrowsIA é dividida em Front-end e Back-end, que se comunicam para gerenciar dados e a IA.

 **Front-end:**
     **Função:** Interage com o usuário, enviando requisições e recebendo respostas.
     **Tecnologias:** Utiliza HTML, CSS, JavaScript (JS) e React, focando em uma interface responsiva e intuitiva.

 **Back-end:**
     **Função:** Processa a lógica de negócio, dados e a Inteligência Artificial (IA).
     **Estrutura:** Consiste em dois módulos:
         **Principal:** Desenvolvido em C#, para dados estruturados (como usuários e permissões).
         **Complementar (IA/Documentos):** Desenvolvido em Python, otimizado para documentos, IA e Processamento de Linguagem Natural (PNL).
     **Tecnologias:** Inclui Node.js, Python e C#.

 **Banco de Dados (SGBD):**
     **Tecnologias:** MySQL e PostgreSQL. São utilizados para armazenar dados estruturados e otimizados para consultas da IA/PNL.

 **Hospedagem (Deploy):**
     **Tecnologia:** A hospedagem da aplicação é realizada na Vercel.

Essa arquitetura permite a escalabilidade da plataforma e a adaptabilidade da IA para diferentes setores.

## Diagrama de classes

O diagrama de classes ilustra graficamente a estrutura do sistema proposto, representando as principais classes que compõem a aplicação, seus atributos e os relacionamentos entre elas. Esse 
diagrama serve como base conceitual para a implementação da lógica do sistema orientado a objetos, permitindo uma melhor visualização da arquitetura da aplicação e facilitando o entendimento da 
interação entre os componentes.

No modelo apresentado, as classes representam as principais entidades do sistema: `Organizacao`, `Usuario`, `Grupo`, `Documento` e a associação `GrupoDeUsuario`. Cada classe possui atributos 
que refletem os dados essenciais a serem armazenados e manipulados durante a execução da aplicação. Os relacionamentos entre essas classes definem regras como cardinalidade, integridade 
referencial e vínculo entre os dados, por exemplo:

- Uma organização pode ter vários usuários, grupos e documentos vinculados a ela.
- Um usuário pode participar de vários grupos e enviar diversos documentos.
- Um grupo pode conter vários usuários, representando uma associação de muitos-para-muitos.
- Documentos estão associados tanto ao usuário que os enviou quanto à organização a que pertencem.

Esse diagrama é fundamental para garantir a coerência entre o modelo de banco de dados e a estrutura de programação orientada a objetos da aplicação.

![Diagrama de classes](images/Diagrama%20de%20classes.png)


##  Modelo de dados

O Modelo Entidade-Relacionamento conhecido também como pé de galinha, foi elaborado para representar de forma clara e integrada os dados necessários ao funcionamento do sistema. 
Ele descreve visualmente como as entidades se relacionam entre si, destacando seus atributos e as ligações estabelecidas por meio de chaves primárias e estrangeiras.

O modelo criado contempla as seguintes entidades:

- **Organizacoes**: representa instituições que utilizam o sistema, armazenando dados como CNPJ, nome, ramo de atuação e informações de contato.
- **Usuarios**: representa os usuários vinculados a uma organização, contendo dados pessoais, tipo de documento, tipo de usuário e informações de acesso.
- **Grupos**: representam agrupamentos definidos por uma organização, com nome, tipo e descrição.
- **GruposDeUsuarios**: entidade associativa responsável por gerenciar os vínculos entre usuários e grupos.
- **Documentos**: armazena arquivos enviados pelos usuários, com metadados como tipo, dados brutos, data de envio e flag de indexação para IA.

Todos os relacionamentos entre essas entidades foram definidos com base nas necessidades funcionais identificadas durante a modelagem dos processos de negócio. A estrutura permite, por exemplo, controlar o acesso de usuários com base em suas organizações e papéis, além de garantir integridade nas associações entre documentos, usuários e grupos.

O modelo ER foi desenvolvido com foco em proporcionar uma base de dados relacional robusta, normalizada e capaz de atender às operações fundamentais da aplicação, incluindo cadastro, consulta, atualização e exclusão dos registros, além de permitir futuras expansões com novas funcionalidades.

![Diagrama de Entidade e relacionamento (pé de galinha)](images/Pé%20de%20galinha.png)

### Modelo físico

```sql
-- Criação da tabela Organizacoes
CREATE TABLE Organizacoes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    CNPJ VARCHAR(18) UNIQUE NOT NULL,
    DataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Ramo VARCHAR(100),
    Telefone VARCHAR(20),
    CEP VARCHAR(9),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Senha VARCHAR(255) NOT NULL,
    ImagemPerfil VARCHAR(255)
);

-- Criação da tabela Usuarios
CREATE TABLE Usuarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Documento VARCHAR(50) UNIQUE NOT NULL,
    TipoDocumento VARCHAR(50),
    DataNascimento DATE,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Senha VARCHAR(255) NOT NULL,
    TipoUsuario VARCHAR(50),
    Ativo BOOLEAN DEFAULT TRUE,
    OrganizacaoId INT,
    FOREIGN KEY (OrganizacaoId) REFERENCES Organizacoes(ID)
);

-- Criação da tabela Grupos
CREATE TABLE Grupos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Descricao TEXT,
    Nome VARCHAR(255) NOT NULL,
    Tipo VARCHAR(50),
    OrganizacaoId INT,
    FOREIGN KEY (OrganizacaoId) REFERENCES Organizacoes(ID)
);

-- Criação da tabela de associação GruposDeUsuarios
CREATE TABLE GruposDeUsuarios (
    UsuarioID INT,
    GrupoID INT,
    PRIMARY KEY (UsuarioID, GrupoID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID),
    FOREIGN KEY (GrupoID) REFERENCES Grupos(ID)
);

-- Criação da tabela Documentos
CREATE TABLE Documentos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(100),
    Dados TEXT,
    UsuarioId INT,
    OrganizacaoID INT,
    DataEnvio DATETIME DEFAULT CURRENT_TIMESTAMP,
    IndexadoParaIa BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(ID),
    FOREIGN KEY (OrganizacaoID) REFERENCES Organizacoes(ID)
);
```
Esse script deverá ser incluído em um arquivo .sql na pasta [de scripts SQL](../src/db).


## Tecnologias




| **Dimensão**   | **Tecnologia**          |
| ---            | ---                     |
| Front-end      | HTML + CSS + JS + React |
| Back-end       | Node.js, Pyhton, C#     |
| SGBD           | MySQL e postgresql      |
| Deploy         | Vercel                  |
| Host           | Azure                   |
| Containerização| Docker                  |
| Serviços Web / APIs| A comunicação entre o Front-end e o Back-end é realizada através de uma Rest API|
| IDE            | Visual Studio Code 

![WhatsApp Image 2025-06-25 at 22 41 46](https://github.com/user-attachments/assets/39522e86-edb8-4393-80e7-854b5522b670)



## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foram realizados.

> **Links úteis**:
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando seu site no Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de software

Para garantir a entrega de um produto de software que atenda às expectativas dos usuários e stakeholders, a equipe adotou como base algumas subcaracterísticas da norma ISO/IEC 25010. A escolha foi feita com foco na simplicidade, usabilidade e robustez do sistema.

### 🔹 Subcaracterísticas escolhidas e justificativas

1. **Usabilidade → Apreensibilidade**
   - Justificativa: O sistema será utilizado por diferentes tipos de usuários, com variados níveis de familiaridade com tecnologia. É essencial que a interface seja simples e intuitiva.
   - Métrica: Aplicar teste de usabilidade com usuários reais e medir tempo médio até completar uma tarefa.

2. **Confiabilidade → Maturidade**
   - Justificativa: O sistema deve operar corretamente sem falhas frequentes, garantindo estabilidade durante o uso.
   - Métrica: Número de erros reportados por semana durante os testes ou após o deploy.

3. **Eficiência de Desempenho → Tempo de resposta**
   - Justificativa: A aplicação precisa responder rapidamente a comandos e carregamento de dados, evitando frustração dos usuários.
   - Métrica: Tempo médio de resposta medido com ferramentas como Postman ou Google Lighthouse.

4. **Segurança → Confidencialidade**
   - Justificativa: O sistema manipula dados sensíveis (como CPF, documentos e senhas), por isso deve garantir que essas informações estejam protegidas.
   - Métrica: Verificação da existência de criptografia, autenticação por senha e controle de acesso por tipo de usuário.

5. **Manutenibilidade → Modularidade**
   - Justificativa: Para facilitar correções e atualizações futuras, o sistema deve ser construído de forma modular, separando responsabilidades entre componentes.
   - Métrica: Quantidade média de classes por módulo; avaliação da independência entre módulos via análise de dependência.

---

### 📝 Conclusão

A adoção dessas subcaracterísticas ajudará a guiar o desenvolvimento do sistema com foco em qualidade desde as etapas iniciais. As métricas propostas serão aplicadas ao longo do projeto como forma de garantir que os padrões desejados estejam sendo atingidos.
