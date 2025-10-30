const BasePage = require("./BasePage");
const RadioButtonPage = require('./elements/RadioButtonPage.js');
const CheckBoxPage= require('./elements/CheckBoxPage.js');

class ElementsPage extends BasePage 
{
  constructor(driver) {
    super(driver);
    this.CheckBoxMenuItem= { xpath: "//li[@id='item-1']//span[text()='Check Box']"};
    this.RadioButtonMenuItem= { xpath: "//li[@id='item-2']//span[text()='Radio Button']"};
  }

  async gotoRadioButtonMenuItem() {
      await this._click(this.RadioButtonMenuItem);
      return new RadioButtonPage(this.driver);
  }
  async gotoCheckBoxMenuItem() {
      await this._click(this.CheckBoxMenuItem);
      return new CheckBoxPage(this.driver);
  }
}

module.exports = ElementsPage;