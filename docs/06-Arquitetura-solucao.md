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

O diagrama de classes ilustra graficamente a estrutura do software e como cada uma das classes estará interligada. Essas classes servem de modelo para materializar os objetos que serão executados na memória.

> **Links úteis**:
> - [Diagramas de classes - documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.7.0?topic=diagrams-class)
> - [O que é um diagrama de classe UML?](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

##  Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam realizar o cadastro de dados e os controles associados aos processos identificados, assim como suas recuperações.

Utilizando a notação do DER (Diagrama Entidade-Relacionamento), elabore um modelo, usando alguma ferramenta, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar também o controle de acesso dos usuários (partes interessadas nos processos) de acordo com os papéis definidos nos modelos do processo de negócio.

Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos.

### Modelo ER

O Modelo ER representa, por meio de um diagrama, como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

> **Links úteis**:
> - [Como fazer um diagrama entidade relacionamento](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

### Esquema relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 

![Exemplo de um modelo relacional](images/modelo_relacional.png "Exemplo de modelo relacional.")
---

> **Links úteis**:
> - [Criando um modelo relacional - documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/12.0.0?topic=designer-creating-relational-model)

### Modelo físico

Insira aqui o script de criação das tabelas do banco de dados.

Veja um exemplo:

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


## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foram realizados.

> **Links úteis**:
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando seu site no Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de software

Conceituar qualidade é uma tarefa complexa, mas ela pode ser vista como um método gerencial que, por meio de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto do desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem atendidas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, esse nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software. Com base nessas características e nas respectivas subcaracterísticas, identifique as subcaracterísticas que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software, considerando alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão à equipe avaliar os objetos de interesse.

> **Links úteis**:
> - [ISO/IEC 25010:2011 - Systems and Software Engineering — Systems and Software Quality Requirements and Evaluation (SQuaRE) — System and Software Quality Models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de software - Engenharia de Software](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209)
