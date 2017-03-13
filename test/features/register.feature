Feature: 1. Upload de arquivo de contatos Facebook

  Eu como corretor
  Quero acessar o cadastro do corretor
  Para carregar os meus contatos do Facebook

  Background:
	Given Estou completando meu cadastro no passo 5 (Upload de Bases)

  @watch
  Scenario: 1. Carregar arquivo friends.htm
	Given que estou na etapa 5 do cadastro de corretor
	When clicar no botão selecionar arquivo com o ícone do Facebook
	And selecionar o arquivo friends.htm
	Then deve ser exibido a frase "1 base(s) a ser carregada" e o botão Upar Bases

  @watch
  Scenario: 2. Alterar o arquivo selecionado
	Given que selecionei um arquivo e o botão Upar bases foi apresentado
	When clicar no botão selecionar arquivo com o ícone do Facebook
	Then deve ser aberto a janela para escolha de um novo arquivo

  @watch
  Scenario: 3. Carregar um arquivo com uma extensão diferente de .htm
	Given que estou na etapa 5 do cadastro de corretor
	When clicar no botão selecionar arquivo com o ícone do Facebook
	And selecionar um arquivo com extensão diferente de .htm
	Then o sistema não deve permitir

  @watch
  Scenario: 4. Carregar dois arquivos com extensão .htm simultaneamente
	Given que estou na etapa 5 do cadastro de corretor
	When clicar no botão selecionar arquivo com o ícone do Facebook
	And selecionar dois arquivos com extensão .htm
	Then o sistema não deve permitir

  @watch
  Scenario: 5. Carregar arquivo friends.htm com formato incorreto
	Given que estou na etapa 5 do cadastro de corretor
	When clicar no botão selecionar arquivo com o ícone do Facebook
	And selecionar dois arquivos com extensão .htm
	Then o sistema não deve permitir

  @watch
  Scenario: 6. Upar Base de contatos
	Given que estou na etapa 5 do cadastro de corretor com um arquivo selecionado
	When clicar no botão Upar Bases
	Then o sistema deve carregar os contatos desse arquivo para minha lista de contatos da ferramenta, apresentar a frase “Upload Concluído” e exibir o botão finalizar

 # /tests/features/register.feature
