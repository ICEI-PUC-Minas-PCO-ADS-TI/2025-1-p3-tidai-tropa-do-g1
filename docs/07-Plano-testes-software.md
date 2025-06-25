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
- Consultas ao Chatbot e sua resposta esperada

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
| CT05| Cadastro documento                 | Ficheiro         | Documento lançado na base de dados          | Funcional|
| CT06| Usuário não logado                 | -                                    | Lançamento não autorizado   | Funcional|
| CT07| Validação de valor negativo              | Valor negativo no campo de entrada   | Exibição de erro de validação          | Funcional|

### 6.3 ChatBot

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     | Tipo     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|----------|
| CT08| Responder o usuário              | Mensagem (consulta)                                  | Resposta conforme pergunta do usuário e documento enviado            | Funcional|
| CT09|          |                 |   | Funcional|

---

## 7. Testes Não Funcionais

### 7.1 Usabilidade

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|
| NF01| Interface intuitiva                      | Navegação comum                      | Usuário consegue utilizar sem ajuda    |
| NF02| Feedback visual adequado                 | Ações de clique e erro               | Exibição de mensagens e indicadores    |

### 7.2 Desempenho

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|
| NF03| Tempo de carregamento                    | Acesso inicial                       | Carregamento em menos de 3 segundos    |

### 7.3 Segurança

| ID  | Descrição                                | Entrada                              | Resultado Esperado                     |
|-----|-------------------------------------------|--------------------------------------|----------------------------------------|
| NF04| Armazenamento seguro de senhas           | Cadastro                             | Senhas criptografadas no banco         |
| NF05| Bloqueio de acesso com login incorreto   | Várias tentativas erradas            | Bloqueio temporário da conta           |

---

## 8. Relatório de Resultados

Cada teste será executado e terá seu resultado documentado conforme o modelo abaixo:

| Caso de Teste | Resultado Esperado | Resultado Obtido | Status (Aprovado / Reprovado) | Observações |
|---------------|--------------------|------------------|-------------------------------|-------------|
| CT01          | Cadastro com sucesso| Cadastro ok      | Aprovado                      | -           |

---

## 9. Conclusão

Este plano de testes visa assegurar que o sistema **CrowsIA** seja entregue com qualidade, minimizando falhas e proporcionando uma boa experiência ao usuário.
.
