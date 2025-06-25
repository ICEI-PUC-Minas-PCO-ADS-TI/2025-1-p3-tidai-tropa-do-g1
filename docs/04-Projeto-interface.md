
# Projeto de interface

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A interface do sistema foi projetada com foco na **simplicidade, clareza e eficiência na navegação**, de forma a atender aos **requisitos funcionais**, **não funcionais** e às 
**histórias de usuário** definidas na especificação do projeto.
Em termos gerais, o layout das telas segue um padrão visual coeso, com **menus laterais organizados por categorias**, **cores neutras** para conforto visual e elementos bem posicionados que 
facilitam a usabilidade. O objetivo foi oferecer uma experiência acessível para diferentes perfis de usuários, com uma curva de aprendizado mínima.
As funcionalidades são facilmente identificáveis, com **ícones representativos**, **textos claros** e **ações agrupadas logicamente**, permitindo que o usuário navegue entre as seções como
login, cadastro, home, configurações e área de busca de maneira intuitiva. Essa estrutura atende diretamente aos **requisitos funcionais de navegação, busca de documentos e gerenciamento de usuários e grupos**.
Do ponto de vista dos **requisitos não funcionais**, a interface foi elaborada para garantir:
- **Desempenho** adequado (com fluxos simples e leves),
- **Segurança visual** (por meio de identificação clara do usuário e controles de acesso),
- E **usabilidade**, priorizando a organização da informação e a facilidade de interação.
O design também reflete as **histórias de usuário**, como a necessidade de um administrador gerenciar arquivos e permissões de grupos e usuários, ou de colaboradores acessarem rapidamente os documentos por área — tudo isso traduzido visualmente de forma direta e funcional no protótipo interativo apresentado.

![Página HOME como exemplo](images/Home.png)

 ## User flow

A imagem a seguir representa o fluxo de navegação do usuário dentro do sistema, destacando as etapas, decisões e ações que podem ser realizadas desde o momento do cadastro até a utilização efetiva da aplicação.

![User flow](images/UserFlow_Crows.jpg)

<!-- > **Links úteis**:
> - [User flow: o quê é e como fazer?](https://medium.com/7bits/fluxo-de-usu%C3%A1rio-user-flow-o-que-%C3%A9-como-fazer-79d965872534)
> - [User flow vs site maps](http://designr.com.br/sitemap-e-user-flow-quais-as-diferencas-e-quando-usar-cada-um/)
> - [Top 25 user flow tools & templates for smooth](https://www.mockplus.com/blog/post/user-flow-tools) -->

### Diagrama de fluxo

Os seguinte diagrama ilustra como será o fluxo a ser seguido por usuários na aplicação, sendo esse fluxo contínuo e de fácil entendimento.

![Diagrama de fluxo](images/Diagrama_de_fluxo.jpeg)

## Interface do sistema

As imagens a seguir representam os projetos de interface do sistema, onde definimos o design e o posicionamento das funcionalidades da Crows IA.

### Login
A página de Login, onde o usuário pode se autenticar
![Página de Login](images/Login.png)

### Cadastro
Página onde usuários não registrados poderão criar suas credenciais
![Página de Cadastro](images/Cadastro.png)

### Home
Página inicial do sistema, que conta com algumas informações do usuário, um breve resumo dos arquivos disponíveis para esse usuário acessar e um campo de ChatBot com a IA da plataforma
![Página de Home](images/Home.png)

### Usuários
Nessa página, os admnistradores de organizações poderão gerenciar seus usuários, podendo visualizar, mover, adicionar, remover, entre outras ações envolvendo os usuários
![Página de Usuários](images/Usuarios.png)

### Adicionar Usuários
Nessa página, os admnistradores de organizações poderão visualizar um modal no qual será possível preencher o cadastro de um novo usuário
![Página de Usuários](images/AdicionarUsuarios.png)

### Edição de Grupos
Página onde os admnistradores de organizações poderão gerenciar seus grupos de usuários, podendo visualizar, mover, adicionar, remover, entre outras ações envolvendo os grupos
![Edição de Grupos](images/EdicaoDeGrupos.png)
