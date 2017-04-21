Feature: Responder a pergunta “Você tem veículo?”

  Eu como corretor
  Quero responder a pergunta “Você tem veículo” do questionário lúdico do Carro Fácil
  Para prosseguir com a venda do produto Carro Fácil

  Scenario: Tratamento da resposta "Sim, 0 KM" para a pergunta "Você tem veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta "Você tem veículo?”
    And a resposta for “Sim, 0 KM”
    Then deverão aparecer os seguintes blocos de pergunta:
    And  "Qual é o seu veículo?"
    And  "Você pagou este veículo à vista ou financiado?"
    And "Em média, com quanto tempo você troca de veículo?"
    And deverão ser exibidas as seguintes argumentações:
    And "Depreciação média do veículo: 20% por ano"
    And "Melhor planejamento financeiro"
    And "Não precisa retirar seus investimentos"

  Scenario: Tratamento da resposta "Sim, usado" para a pergunta "Você tem veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta "Você tem veículo?”
    And a resposta for “Sim, usado”
    Then deverão aparecer os seguintes blocos de pergunta:
    And "Qual é o seu veículo?"
    And "Você pagou este veículo à vista ou financiado?",
    And "Em média, com quanto tempo você troca de veículo?"
    And deverão ser exibidas as seguintes argumentações:
    And "Depreciação média do veículo: 20% por ano"
    And "Melhor planejamento financeiro"
    And "Não precisa retirar seus investimentos"

  Scenario: Tratamento da resposta "Não" para a pergunta "Você tem veículo?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta "Você tem veículo?”
    And a resposta for “Não”
    Then deverá ser aberto o bloco para responder à pergunta: “Qual seu meio de locomoção preferido?”