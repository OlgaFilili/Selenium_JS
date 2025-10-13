const BasePage = require("../BasePage");

class RadioButtonPage extends BasePage 
{
  constructor(driver) {
    super(driver);
    this.RB_Impressive= { xpath: "//input[@id='impressiveRadio']"};
    
  }

  async clickRB_Impressive() {
    await this._click(this.RB_Impressive);
  }
  async isRB_ImpressiveSelected() {
    return await this._find(this.RB_Impressive).isSelected();
  }

}

module.exports= RadioButtonPage;