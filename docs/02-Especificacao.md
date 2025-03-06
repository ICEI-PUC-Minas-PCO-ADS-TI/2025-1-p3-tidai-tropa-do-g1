# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## Personas
Durante o processo de análise e compreensão do problema, foram identificadas e detalhadas as seguintes personas, representando os principais perfis de usuários alvos da plataforma:

### Mariana Souza

| **Nome**         | **Imagem** | **Idade** | **Profissão**                 | **Frustrações**                                                                                   | **Hobbies**                  |
|-----------------|-----------|:--------:|:----------------------------:|--------------------------------------------------------------------------------------------------|:----------------------------:|
| Mariana Souza  | ![image](https://github.com/user-attachments/assets/d800f002-a2de-43c8-816c-de09ddd5fe03) | 34 anos   | Proprietária de clínica odontológica | Dificuldade em acessar rapidamente informações dos pacientes <br> Falta de um sistema integrado | Ler <br> Viajar              |

Mariana é proprietária de uma pequena clínica odontológica em Belo Horizonte. Trabalha com uma equipe reduzida e administra todas as informações dos pacientes, desde prontuários até pagamentos, utilizando planilhas e anotações manuais. Seu maior problema é a falta de organização digital, tornando difícil acessar rapidamente informações importantes. Ela gostaria de automatizar esse processo, mas não sabe por onde começar.

---

### Rafael Campos

| **Nome**         | **Imagem** | **Idade** | **Profissão**                 | **Frustrações**                                                                                   | **Hobbies**                  |
|-----------------|-----------|:--------:|:----------------------------:|--------------------------------------------------------------------------------------------------|:----------------------------:|
| Rafael Campos  | ![image](https://github.com/user-attachments/assets/39e8e9fc-498c-4fb8-aef3-f83ada777a12) | 28 anos   | Dono de e-commerce de eletrônicos | Perde tempo procurando informações sobre pedidos e estoque <br> Falta de automação no negócio   | Tecnologia <br> Games        |

Rafael é dono de uma loja virtual de eletrônicos e faz a gestão do seu estoque, pedidos e atendimento ao cliente praticamente sozinho. Ele usa várias planilhas, notas fiscais digitais e documentos espalhados no Google Drive e OneDrive, mas tem dificuldade em encontrar rapidamente as informações que precisa. Muitas vezes, perde oportunidades de venda porque demora a localizar dados sobre produtos e clientes.

---

### Carla Menezes

| **Nome**         | **Imagem** | **Idade** | **Profissão**                 | **Frustrações**                                                                                   | **Hobbies**                  |
|-----------------|-----------|:--------:|:----------------------------:|--------------------------------------------------------------------------------------------------|:----------------------------:|
| Carla Menezes  | ![image](https://github.com/user-attachments/assets/69b590cf-8e89-4bcc-a3a8-104318ce98aa) | 40 anos   | Gerente administrativa de construtora | Documentação de obras desorganizada <br> Equipe perde tempo buscando arquivos                   | Caminhadas <br> Cozinhar     |

Carla trabalha em uma construtora e gerencia toda a parte administrativa da empresa. Sua equipe lida diariamente com contratos, orçamentos, cronogramas e relatórios técnicos, que ficam espalhados entre e-mails, pastas no computador e serviços de nuvem. A falta de um sistema integrado faz com que sua equipe perca tempo buscando documentos e informações importantes. Ela deseja uma solução que organize os arquivos e permita acessá-los rapidamente.

---

### Vinícius Oliveira

| **Nome**         | **Imagem** | **Idade** | **Profissão**                 | **Frustrações**                                                                                   | **Hobbies**                  |
|-----------------|-----------|:--------:|:----------------------------:|--------------------------------------------------------------------------------------------------|:----------------------------:|
| Vinícius Oliveira | ![image](https://github.com/user-attachments/assets/0e08b4e1-03fe-4b55-902f-4d51f9290535) | 31 anos   | Dono de agência de marketing digital | Dificuldade em localizar documentos antigos <br> Volume excessivo de arquivos no Google Drive  | Fotografia <br> Música       |

Vinícius é dono de uma agência de marketing digital e trabalha com criação de conteúdo, campanhas publicitárias e gerenciamento de mídias sociais para clientes. Com o passar dos anos, acumulou uma grande quantidade de arquivos, como imagens, vídeos, textos e relatórios, armazenados no Google Drive e outros serviços. O problema é que encontrar um arquivo específico entre milhares se tornou um desafio. Ele precisa de uma ferramenta que facilite a busca e organização dos documentos da agência.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

| EU COMO...  | QUERO/PRECISO ...  | PARA ...  |
|----------------------|-----------------------------------|-------------------------|
| Mariana Souza | Quero acessar rapidamente os documentos dos pacientes via chatbot | Para agilizar o atendimento e evitar a perda de tempo procurando arquivos |
| Mariana Souza | Quero poder anexar prontuários e documentos de pacientes ao sistema | Para manter todas as informações organizadas e acessíveis digitalmente |
| Mariana Souza | Preciso garantir que apenas minha equipe tenha acesso aos documentos dos pacientes | Para manter a segurança e privacidade das informações |
| Rafael Campos | Preciso de um chatbot que busque informações sobre pedidos e estoque | Para agilizar meu atendimento ao cliente e melhorar a gestão do negócio |
| Rafael Campos | Quero integrar o sistema ao Google Drive e OneDrive | Para centralizar minhas informações de estoque e pedidos num único local |
| Rafael Campos | Quero definir permissões de acesso para funcionários | Para garantir que cada colaborador veja apenas as informações necessárias |
| Carla Menezes | Quero que minha equipe consiga acessar documentos de obras rapidamente | Para evitar perda de tempo e aumentar a produtividade na construtora |
| Carla Menezes | Preciso organizar e filtrar os documentos anexados no sistema | Para facilitar a busca por contratos e orçamentos antigos |
| Carla Menezes | Quero poder anexar documentos de obras diretamente do SharePoint | Para manter tudo armazenado em um só lugar de forma prática |
| Vinícius Oliveira | Quero pesquisar rapidamente arquivos de campanhas passadas via chatbot | Para agilizar a recuperação de materiais e otimizar o trabalho da equipe |
| Vinícius Oliveira | Preciso que o sistema me ajude a organizar e categorizar documentos | Para melhorar a gestão de arquivos antigos e recentes |
| Vinícius Oliveira | Quero garantir que meus arquivos de mídia estejam seguros e acessíveis apenas para minha equipe | Para evitar perda de informações e vazamento de dados |

## Requisitos

A tabelas inserida abaixo indica os requisitos funcionais do projeto, assim como o grau de prioridade estabelecido para cada um deles. Esses requisitos apontam todos as funcionalidades previstas para a implementação da plataforma.
### Requisitos funcionais

|ID    | Descrição do Requisito                                                                                                                                                                                                      | Prioridade |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
|RF-001| O sistema deve permitir o registro de um usuário administrador, nomeado organização, que representará virtualmente o cliente contratante                                                                                    | ALTA       |
|RF-002| O sistema deve permitir que o usuário faça login, seja com um perfil de organização ou como um usuário comum                                                                                                                | ALTA       | 
|RF-003| O sistema deve permitir que o usuário utilize 2 fatores de autenticação em seu login                                                                                                                                        | BAIXA      |
|RF-004| O sistema deve permitir que as organizações criem usuários para seus colaboradores acesarem a plataforma                                                                                                                    | MÉDIA      |
|RF-005| O sistema deve permitir que as organizações criem filtros e gerenciem o nível de acesso de seus usuários colaboradores às informações                                                                                       | BAIXA      |
|RF-006| O sistema deve permitir que as organizações selecionem o papel de cada colaborador no sistema (Leitor, Editor, Etc)                                                                                                         | BAIXA      |
|RF-007| As organizações e os colaboradores devem conseguir anexar documentos, arquivos e/ou pastas completas para serem armazenados em seu banco de dados                                                                           | ALTA       |
|RF-008| O sistema deve permitir a conexão com ambientes cloud (GoogleDrive, Sharepoint, OneDrive, etc) para alimentação dos bancos de dados                                                                                         | MÉDIA      |
|RF-009| O sistema deve receber os arquivos enviados pelos usuários e armazená-los de forma segura num banco de dados próprio                                                                                                        | ALTA       |
|RF-010| O sistema deve processar os arquivos armazenados no banco de dados, extrair seu conteúdo e convertê-lo em um formato adequado para alimentar uma rede neural com as informações contidas nesses documentos                  | ALTA       |
|RF-011| Criar um ambiente de ChatBot no qual o usuário possa fazer consultas sobre seu banco de dados por meio de uma inteligência artificial                                                                                       | ALTA       |
|RF-011| O sistema deve retornar pelo ChatBot as informações contidas nos documentos solicitados pelo usuário via requisição no chat                                                                                                 | ALTA       |
|RF-012| A rede neural do sistema deve se adaptar às requisições do usuário para entregar informações mais precisas e coesas                                                                                                         | BAIXA      |


### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em dispositivos móveis | MÉDIA | 
|RNF-002| Deve processar as requisições do usuário em no máximo 3 segundos |  BAIXA | 

Com base nas histórias de usuários, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos não funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).

Lembre-se de que cada requisito deve corresponder a uma e somente uma característica-alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas histórias de usuários foram cobertos.

> **Links úteis**:
> - [O que são requisitos funcionais e requisitos não funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [Entenda o que são requisitos de software, a diferença entre requisito funcional e não funcional, e como identificar e documentar cada um deles](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre |
|002| O custo total do projeto não deve exceder o orçamento definido       |

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.

> **Links úteis**:
> - [Criando casos de uso](https://www.ibm.com/docs/pt-br/engineering-lifecycle-management-suite/design-rhapsody/10.0?topic=cases-creating-use)
> - [Como criar diagrama de caso de uso: tutorial passo a passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
