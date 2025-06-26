# Plano de Testes – Crows Inteligência Ampliada

## 1. Introdução

Este documento apresenta o plano de testes elaborado para a plataforma **CrowsIA**, um chatbot voltado para auxiliar usuários no gerenciamento de seus documentos corporativos. O plano engloba testes baseados tanto nos requisitos funcionais quanto nos não funcionais identificados ao longo do desenvolvimento, além das histórias de usuário documentadas pela equipe.

---

## 2. Objetivos dos Testes

- Confirmar que as funcionalidades implementadas atendem aos requisitos especificados.
- Assegurar uma experiência de uso fluida e intuitiva.
- Verificar a integridade, segurança e privacidade dos dados tratados pela plataforma.
- Avaliar a confiabilidade, desempenho e robustez do sistema.
- Polir a experiência do usuário.
---

## 3. Escopo do Teste

Serão avaliadas as principais funcionalidades do sistema, incluindo:

- Cadastro de usuário
- Login
- Registro de documentos.
- Consultas ao Chatbot e sua resposta esperada.
- Consultas com mais de uma documentação.

---

## 4. Estratégia de Testes

### 4.1 Testes Manuais

Serão aplicados para observar aspectos de usabilidade, resposta da interface e validações diretamente visíveis ao usuário.

---

## 5. Critérios de Aceitação

- Todos os testes considerados críticos devem ser aprovados sem exceção.
- Não devem restar falhas classificadas como de alta severidade.
- O sistema deve apresentar comportamento conforme o esperado em 100% dos cenários previstos nos testes funcionais.


---

## 6. Casos de Teste

### 6.1 Cadastro e Login de Usuário

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     | Tipo     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|----------|
| CT01| Cadastro de novo usuário                 | Nome, Nome da Organização, CNPJ, Ramo de atuação, CEP, CPF, DataNascimento, Telefone da organização, e-mail, senha           | Usuário cadastrado com sucesso         | Funcional|
| CT02| Login com acesso correto          | Email, senha e tipo de login           | Redirecionamento para tela Chat  | Funcional|
| CT03| Login com senha incorreta                | Email correto, senha incorreta      | Exibição de mensagem de erro           | Funcional|
| CT04| E-mail inválido no cadastro              | Email com formato inválido          | Exibição de erro de validação do Email        | Funcional|

### 6.2 Cadastrando Documentos

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     | Tipo     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|----------|
| CT05| Cadastro documento                 | Ficheiro (Documento)        | Documento lançado na base de dados          | Funcional|
| CT06| Usuário não logado                 | -                                    | Lançamento não autorizado   | Funcional|


### 6.3 ChatBot

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     | Tipo     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|----------|
| CT07| Responder o usuário              | Mensagem (consulta)                                  | Resposta conforme pergunta do usuário e documento enviado            | Funcional|
| CT08| Responder usuário com mais de um documento enviado         |  Mensagem (Consulta)              |   | Funcional|

---

## 7. Testes Não Funcionais

### 7.1 Usabilidade

| ID   | Descrição                                 | Entrada                              | Resultado Esperado                         |
|------|--------------------------------------------|--------------------------------------|--------------------------------------------|
| NF01 | Facilidade de uso da interface             | Navegação padrão pelo sistema        | Usuário consegue interagir sem instruções  |
| NF02 | Retorno visual adequado às ações           | Cliques em botões e tentativas inválidas | Mensagens claras e indicadores visuais são exibidos |

### 7.2 Desempenho

| ID   | Descrição                                 | Entrada                              | Resultado Esperado                         |
|------|--------------------------------------------|--------------------------------------|--------------------------------------------|
| NF03 | Velocidade de carregamento da aplicação    | Acesso inicial ao sistema            | Sistema carrega em até 3 segundos          |

### 7.3 Segurança

| ID   | Descrição                                 | Entrada                              | Resultado Esperado                         |
|------|--------------------------------------------|--------------------------------------|--------------------------------------------|
| NF04 | Proteção das credenciais do usuário        | Processo de cadastro                 | Senhas são armazenadas de forma criptografada |
| NF05 | Prevenção contra tentativas de acesso malicioso | Diversas entradas incorretas no login | Conta é bloqueada temporariamente após tentativas excessivas |
| NF06 | Tempo de resposta da IA deve ser menor que 6 segundos | Mensagem/Pergunta (Consulta) | O Chat responde rapidamente |
---

## 8. Relatório de Resultados

Cada teste será executado individualmente e seu resultado será registrado conforme o modelo a seguir, permitindo o rastreamento de falhas e validação dos critérios de qualidade estabelecidos.

| Caso de Teste | Resultado Esperado                              | Resultado Obtido                         | Status (Aprovado / Reprovado) | Observações                            |
|---------------|--------------------------------------------------|------------------------------------------|-------------------------------|----------------------------------------|
| CT01          | Cadastro com sucesso                             | Cadastro realizado corretamente           | Aprovado                      | -                                      |
| CT02          | Redirecionar para tela do Chat                   | Login redirecionou para interface correta| Aprovado                      | -                                      |
| CT03          | Mensagem de erro ao inserir senha errada         | Erro exibido corretamente                 | Aprovado                      | -                                      |
| CT04          | Validação de e-mail inválido                     | Sistema bloqueou e-mail mal formatado     | Aprovado                      | -                                      |
| CT05          | Documento salvo na base                          | Documento foi cadastrado com sucesso      | Aprovado                      | -                                      |
| CT06          | Acesso negado para usuário não logado            | Ação bloqueada como esperado              | Aprovado                      | -                                      |
| CT07          | Resposta conforme consulta e documento           | IA respondeu adequadamente à pergunta     | Aprovado                      | -                                      |
| CT08          | IA responde corretamente com múltiplos documentos| Resposta compatível com o contexto geral  | Aprovado                      | IA diferenciou corretamente as fontes  |

---

## 9. Conclusão

O presente plano de testes foi desenvolvido com o objetivo de garantir que a plataforma **CrowsIA** atenda aos padrões esperados de qualidade, desempenho e segurança. Através da execução dos casos de teste definidos, é possível validar se a aplicação está em conformidade com os requisitos levantados durante o desenvolvimento. Além disso, o processo visa identificar pontos de melhoria, contribuindo para uma entrega mais confiável, funcional e centrada no usuário.

