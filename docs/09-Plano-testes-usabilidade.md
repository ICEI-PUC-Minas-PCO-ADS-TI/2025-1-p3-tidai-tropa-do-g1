# Plano de testes de usabilidade

<span style="color:red">Pré-requisitos: <a href="04-Projeto-interface.md"> Projeto de interface</a></span>, <a href="07-Plano-testes-software.md"> Plano de testes de software</a>

[cite_start]O objetivo do Plano de Testes de Usabilidade foi avaliar a qualidade e a experiência do usuário ao interagir com a interface da plataforma CrowsIA. O foco foi entender se as funcionalidades essenciais são intuitivas e se a plataforma atende às expectativas do público-alvo.

[cite_start]Para a realização dos testes, foram convidados 3 participantes com perfis de usuários relevantes para a aplicação. [cite_start]Os testes foram conduzidos de forma remota, utilizando o método de observação direta com gravação da tela para análise posterior. [cite_start]Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados (LGPD), nenhum dado sensível que permitisse identificar os voluntários foi coletado ou exposto.

Visando averiguar a qualidade da experiência, foram definidos os seguintes indicadores de avaliação:

**Taxa de sucesso**: Mede se o usuário conseguiu executar a tarefa proposta com êxito.
**Satisfação subjetiva**: Avalia como o usuário classifica a experiência com o sistema em uma escala de 1 a 5, sendo 1 "Péssimo" e 5 "Ótimo".
**Tempo para conclusão da tarefa**: Compara o tempo em segundos que o usuário levou para executar a tarefa em relação ao tempo de um especialista (desenvolvedor).

[cite_start]As ferramentas utilizadas para a condução e registro dos testes foram um navegador de internet para acesso à plataforma  [cite_start]e um software de gravação de tela, como o OBS Studio, para registrar a interação do usuário durante os cenários propostos.

## Cenários de teste de usabilidade

A seguir estão os cenários de teste utilizados durante a avaliação de usabilidade da plataforma CrowsIA.

| Nº do cenário | Descrição do cenário                                                                                                                                                                                         |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1             | [cite_start]**Novo Cadastro e Primeiras Interações:** O usuário deve realizar um novo cadastro na plataforma, fazer o upload de múltiplos arquivos e, em seguida, utilizar o chatbot para fazer uma requisição sobre o conteúdo de um deles. |
| 2             | [cite_start]**Exploração Detalhada de Documento:** O usuário deve enviar um único documento para a plataforma e, na sequência, realizar várias perguntas diferentes sobre o conteúdo específico desse mesmo documento, a fim de testar a capacidade de extração de informação da IA. |
| 3             | [cite_start]**Busca e Resumo de Conteúdo:** Atuando como um usuário já cadastrado, a tarefa é buscar por um documento já existente na base de dados e solicitar ao chatbot que gere um pequeno resumo de seu conteúdo.     |
