module.exports = function() {
  'use strict';
  var SummaryProfileUrl;

  this.Before(() => {
    //Make Login and go to dashboard page
    navigation.login.makeLogin();

    //Generate a click lead by brokerId and product name and retrieve customer id
    let clickLead = fixtures.clickLead.generateAndGetByBrokerIdAndProduct(navigation.brokerId, fixtures.productName);
    let customerIdForProduct = clickLead.customerId;

    //Set summary profile url for this product x customer
    SummaryProfileUrl = navigation.mainPageUrl + 'summary-profile/' + customerIdForProduct + '/' + fixtures.productName;
  });

  this.Given(/^estou na tela de perfil resumido do cliente$/, function () {
    //Open Summary profile page and waiting for full loading in quotation page
    browser.url(SummaryProfileUrl);
    let isReloadFinish = '//*[@id="div-main"]/div/div[1]/div[2]';
    browser.waitForExist(isReloadFinish, 9*navigation.seconds, true);

    //Check if the the button in summary button is load
    let initQuotationButton = '//*[@id="ini"]';
    browser.waitForExist(initQuotationButton, 9*navigation.seconds);
    expect(browser.element(initQuotationButton).getText()).toEqual('Iniciar Cotação');
  });

  this.When(/^eu clicar no botão Iniciar Cotação$/, function () {
    //Waiting for full loading in quotation page
    browser.pause(5*navigation.seconds);

    //Click on the button
    let initQuotationButton = '//*[@id="ini"]';
    browser.waitForExist(initQuotationButton, 9*navigation.seconds);
    browser.scroll(0, 250);
    browser.moveToObject(initQuotationButton);
    browser.click(initQuotationButton);
  });

  this.When(/^o cliente tiver propensão para comprar o Carro Fácil$/, function () {
    //Not defined in BDD
    return 'ok';
  });

  this.Then(/^será exibida a tela para preenchimento do questionário lúdico do cliente com as seguintes perguntas na tela: "([^"]*)"$/, function (arg1) {
    //Waiting for nimble card and check for the argument
    let nimbleQuestionCard = '//*[@id="possuiVeiculo"]/div/div/div/div/div[1]/p';
    browser.waitForExist(nimbleQuestionCard, 9*navigation.seconds);
    expect(browser.element(nimbleQuestionCard).getText()).toEqual(arg1);
  });

  this.Then(/^será exibida a tela para preenchimento do questionário lúdico do cliente com as seguintes argumentações na tela: "([^"]*)"$/, function (arg1) {
    //Wait for arguments load
    let fieldsCheckedAndPass = 0;
    let argumentField = '//*[@id="root"]/div/div/div[2]/div/div[2]/div/div/div/ul/li[1]/div[1]/p';
    browser.waitForExist(argumentField, 9*navigation.seconds);

    //Split array of arguments to check
    var fieldsToCheck = arg1.split('|');

    //Check in arguments if is right
    for (let indexTablePointer = 1; indexTablePointer < fieldsToCheck.length + 1; indexTablePointer++) {
      let argumentField =  '//*[@id="root"]/div/div/div[2]/div/div[2]/div/div/div/ul/li[' + indexTablePointer.toString() + ']/div[1]/p';
      if (browser.isExisting(argumentField) == true) {
        //console.log('argument_table[' + browser.element(argumentField).getAttribute('innerText') + '] with split[' + fieldsToCheck[indexTablePointer-1].trim() + ']');
        expect(browser.element(argumentField).getAttribute('innerText')).toEqual(fieldsToCheck[indexTablePointer-1].trim());
      }
    }
  });
};
