Feature: Responder a pergunta “Qual seu meio de locomoção preferido?”

  Eu como corretor
  Quero responder a pergunta “Qual seu meio de locomoção preferido?” do questionário lúdico do Carro Fácil
  Para prosseguir com a venda do produto Carro Fácil

  Scenario: Tratamento da resposta "Transporte público" para a pergunta “Qual seu meio de locomoção preferido?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Qual seu meio de locomoção preferido?”
    And a resposta for “Transporte público”
    Then deverei ser direcionado para a tela de seleção do veículo que será contratado.

  Scenario: Tratamento da resposta "Uber ou táxi" para a pergunta “Qual seu meio de locomoção preferido?”
    Given estou na tela de questionário lúdico do Carro Fácil
    When eu estiver respondendo à pergunta “Qual seu meio de locomoção preferido?”
    And a resposta for “Uber ou táxi”
    Then deverá aparecer o bloco para responder à pergunta “Quanto você roda por dia?” com as seguintes opções de resposta:
    And "Até 10 KM"
    And "Até 20 KM"
    And "Até 30 KM"
    And "Acima de 30 KM"
    And "Não sei informar"
    And deverão aparecer as seguintes argumentações: "Você já fez as contas de quanto gasta com Taxi e Uber?"
    And "Você paga um valor mensal e só se preocupa em dirigir."
    And "Parcelas fixas e sem surpresas"
    And "Melhor planejamento financeiro"
