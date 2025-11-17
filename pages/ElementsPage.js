const BasePage = require("./BasePage");
const MainMenu = require("../components/MainMenu.js");
const RadioButtonPage = require('./elements/RadioButtonPage.js');
const CheckBoxPage= require('./elements/CheckBoxPage.js');
const WebTablesPage= require('./elements/WebTablesPage.js');

class ElementsPage extends BasePage 
{
  constructor(driver) {
    super(driver);
    this.menu= new MainMenu(driver);
    this.infoText= { xpath: "//div[text()='Please select an item from left to start practice.']"};
  }
  async gotoRadioButtonMenuItem() {
    await this.menu.clickRadioButtonMenuItem();
    return new RadioButtonPage(this.driver);
  }
  async gotoCheckBoxMenuItem() {
    await this.menu.clickCheckBoxMenuItem();
    return new CheckBoxPage(this.driver);
  }
  async gotoWebTablesMenuItem() {
    await this.menu.clickWebTablesMenuItem();
    return new WebTablesPage(this.driver);
  }
}

module.exports = ElementsPage;