const BasePage = require("./BasePage.js");
const MainMenu = require("../components/MainMenu.js");
const RadioButtonPage = require('./elements/RadioButtonPage.js');
const CheckBoxPage= require('./elements/CheckBoxPage.js');
const WebTablesPage= require('./elements/WebTablesPage.js');

class ElementsPage extends BasePage 
{
  constructor(driver) {
    super(driver);
    this.menu= new MainMenu(driver);
    this.cardName="Elements";
    this.itemNames=['Text Box', 'Check Box', 'Radio Button', 'Web Tables'];
    this.itemLinks=['/text-box', '/checkbox', '/radio-button', '/webtables'];
    this.infoText= { xpath: "//div[contains(@class,'col-12 mt-4 col-md-6')]"};
  }
  async getElementsPageText() {
    return await this._getText(this.infoText);
  }
  
  async gotoRadioButtonMenuItem() {
    await this.menu.clickMenuItem(this.cardName, this.itemLinks[2]);
    return new RadioButtonPage(this.driver);
  }
  async gotoCheckBoxMenuItem() {
    await this.menu.clickMenuItem(this.cardName, this.itemLinks[1]);
    return new CheckBoxPage(this.driver);
  }
  async gotoWebTablesMenuItem() {
    await this.menu.clickMenuItem(this.cardName, this.itemLinks[3]);
    return new WebTablesPage(this.driver);
  }
}

module.exports = ElementsPage;