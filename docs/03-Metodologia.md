
# Metodologia

Para garantir uma execução eficiente do projeto, foi adotada uma metodologia que organiza o desenvolvimento por meio de versionamento de código, uso de ferramentas apropriadas e divisão estruturada de tarefas ao longo das sprints. Esse processo visa manter a rastreabilidade das mudanças, otimizar a colaboração entre os integrantes da equipe e assegurar a entrega contínua de funcionalidades. A definição dessa abordagem permite um fluxo de trabalho ágil e adaptável às necessidades do projeto.

## Relação de ambientes de trabalho

Para agilizar o desenvolvimento do projeto, foram utilizados diversos ambientes/plataformas para atingir os objetivos listados. São eles:

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | [Repositório do Projeto](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p3-tidai-tropa-do-g1/tree/main)                            |
| Documentos do projeto               | GitHub                             | [Repositório do Projeto](https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p3-tidai-tropa-do-g1/tree/main)                          |

## Controle de versão

Para garantir um desenvolvimento organizado e colaborativo, o projeto utilizará o GitHub como ferramenta de versionamento de código. A estrutura de branches será adotada para separar as diferentes etapas do desenvolvimento, facilitando a rastreabilidade das alterações e evitando conflitos entre implementações simultâneas.

O projeto segue a seguinte convenção para o nome de branches:

- Branch `main`: Contém a versão mais estável e atualizada do projeto, reunindo todas as funcionalidades implementadas e testadas até o momento. Nenhuma alteração será feita diretamente nesta branch, garantindo a integridade do código.
- Branches de Sprint (`sprint-X`): Para cada sprint, será criada uma branch nomeada de acordo com o número da sprint correspondente (exemplo: sprint-1, sprint-2). Nessas branches, as novas funcionalidades e ajustes serão desenvolvidos, testados e validados antes de serem unificados na branch principal, tanto quanto aos códigos quanto à documentação recorrente do projeto.

Quanto ao processo de integração, o projeto adota a seguinte padronização de ações:

- Criação da Branch da Sprint: No início de cada sprint, uma nova branch será criada a partir da main.
- Desenvolvimento e Testes: As funcionalidades serão implementadas e testadas dentro da branch específica da sprint, garantindo que cada alteração seja validada antes da unificação.
- Revisão e Merge: Ao final da sprint, as mudanças serão revisadas e, se aprovadas, serão mescladas na main para manter o projeto atualizado e pronto para a próxima fase de desenvolvimento.

Essa abordagem permite um fluxo de trabalho estruturado, garantindo a estabilidade do código e facilitando a colaboração entre os membros da equipe.

## Planejamento do projeto

###  Divisão de papéis

Durante o desenvolvimento do projeto, a seguinte divisão de papéis foi estabelecida em cada Sprint: 

#### Sprint 1
- _Scrum master_: Victor Schneider
- Levantamento de informações: Victor Schneider.
- Diagramas: Luis Sampaio.
- Documentação: Thiago Moreira, Igor Maia e Igor Pereira.

#### Sprint 2
- _Scrum master_: Victor Schneider.
- Desenvolvedor _front-end_: Igor Maia e Igor Pereira, Luis Sampaio.
- Desenvolvedor _back-end_: Victor Schneider, Luis Sampaio, Thiago Moreira.
- Testes: Thiago Moreira, Igor Maia e Igor Pereira, Victor Schneider, Luis Sampaio.

###  Quadro de tarefas

<!-- > Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo. -->

#### Sprint 1

Atualizado em: 19/02/2025

| Responsável      | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----            |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago M.        | Objetivos                                  | 19/02/2025     | 26/02/2025 | ✔️    | 19/02/2025 |
| Igor Maia        | Justificativa                              | 19/02/2025     | 26/02/2025 | ✔️    | 19/02/2025 |
| Igor Pereira     | Público Alvo                               | 19/02/2025     | 26/02/2025 | ✔️    | 19/02/2025 |
| Victor Schneider | Levantamento do Contexto e Especificações  | 19/02/2025     | 26/02/2025 | ✔️    | 19/02/2025 |
| Victor Schneider | Preenchimento do Requisitos Funcionais     | 19/02/2025     | 26/02/2025 | ✔️    | 19/02/2025 |
| Victor Schneider | Finalização do arquivo de especificações   | 19/02/2025     | 12/03/2025 | ✔️    | 11/03/2025 |
| Victor Schneider | Finalização do arquivo de metodologia      | 19/02/2025     | 12/03/2025 | ✔️    | 11/03/2025 |
| Luis Sampaio     | Preenchimento do READ.ME                   | 19/02/2025     | 26/02/2025 | ✔️    | 19/02/2025 |
| Luis Sampaio     | Diagrama de casos de uso                   | 26/02/2025     | 26/02/2025 | ✔️    | 05/03/2025 |
| Thiago M.        | Diagrama de casos de uso                   | 26/02/2025     | 26/02/2025 | ✔️    | 05/03/2025 |


#### Sprint 2

Atualizado em: 08/04/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Luis Sampaio  | Wireframes       | 01/04/2025     | 09/04/2025 | ✔️    | 02/04/2025      |
| Luis Sampaio  | User Flow        | 02/04/2025     | 09/04/2025 | ✔️    | 03/04/2025      |
| Luis Sampaio  | Diagrama de fluxo| 05/04/2025     | 09/04/2025 | ✔️    | 07/04/2025      |
| AlunoY        | Página de login  | 01/02/2024     | 09/04/2025 | ⌛     |                 |
| AlunoK        | Script de login  |  01/01/2024    | 09/04/2025 | ❌    |       |


Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado


### Processo

O desenvolvimento do projeto seguirá a metodologia ágil Scrum, permitindo uma abordagem iterativa e incremental. O trabalho será organizado em sprints, cada uma com um período determinado para o desenvolvimento de funcionalidades específicas. Ao final de cada sprint, serão realizadas entregas parciais do sistema, garantindo um progresso contínuo e validado ao longo do tempo. As atividades serão distribuídas entre os membros da equipe com base na carga de trabalho e nas habilidades individuais, promovendo um fluxo de desenvolvimento equilibrado.

Diferente do modelo tradicional do Scrum, o projeto não contará com um Scrum Master, uma vez que todos os membros participam ativamente do desenvolvimento. A organização das tarefas e artefatos será feita de forma colaborativa, garantindo que todos tenham visibilidade sobre o andamento do projeto. Esse modelo proporciona flexibilidade e eficiência na execução das atividades, mantendo a equipe alinhada e garantindo a entrega contínua de valor ao projeto.

### Ferramentas

Para o desenvolvimento do projeto, o grupo adotará as tecnologias listadas a seguir, com o objetivo de criar um ambiente intuitivo e acessível para os desenvolvedores. Além disso, busca-se garantir uma integração prática e dinâmica, otimizando o fluxo de trabalho e promovendo maior eficiência no desenvolvimento.

| Ambiente                            | Plataforma                         | Link de acesso                                                                         |
|-------------------------------------|------------------------------------|----------------------------------------                                                |
| Repositório de código fonte         | GitHub                             | https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p3-tidai-tropa-do-g1/tree/main     |
| Documentos do projeto               | GitHub                             | https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2025-1-p3-tidai-tropa-do-g1/tree/main     |
| Projeto de interface                | Figma                              | http://....                                                                            |
| Gerenciamento do projeto            | GitHub Projects                    | https://github.com/orgs/ICEI-PUC-Minas-PCO-ADS-TI/projects/42/views/1                  |
| Hospedagem                          | Vercel                             | http://....                                                                            |

### Tecnologias

| Ambiente                            | Linguagem                          |
|-------------------------------------|------------------------------------|
| Tecnologia back-end                 | Python                             |
| Framework back-end                  | Django                             |
| Tecnologia front-end                | HTML + CSS                         |
| Framework  front-end                | Node.js                            |
| Framework  front-end                | React                              |