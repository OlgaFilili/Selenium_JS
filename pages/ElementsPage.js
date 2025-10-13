const BasePage = require("./BasePage");
const RadioButtonPage = require('./elements/RadioButtonPage.js');

class ElementsPage extends BasePage 
{
  constructor(driver) {
    super(driver);
    this.RadioButtonMenuItem= { xpath: "//li[@id='item-2']//span[text()='Radio Button']"};
  }

  async gotoRadioButtonMenuItem() {
      await this._find(this.RadioButtonMenuItem);
      await this._click(this.RadioButtonMenuItem);
      return new RadioButtonPage(this.driver);
    }
}

module.exports = ElementsPage;