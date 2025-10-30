const BasePage = require("../BasePage");
const { getDirectText } = require("../../utils/BrowserUtils");

class RadioButtonPage extends BasePage 
{
  constructor(driver) {
    super(driver);
    this.RBXpathPrefix= "//input[@id='";
    this.RBXpathSuffix= "Radio']";
    this.RBXpathLabelSuffix= "/following-sibling::label";
    this.confirmationMessageXpath="//p[@class='mt-3']";
  }
  
  // helper: builds full locator for given option
  _getRBInputLocator(option){
    return { xpath: `${this.RBXpathPrefix}${option}${this.RBXpathSuffix}`};
  }
  _getRBLabelLocator(option){
    return { xpath: `${this.RBXpathPrefix}${option}${this.RBXpathSuffix}${this.RBXpathLabelSuffix}`};
  }

  async selectRBOption(option) {
    const locator= this._getRBLabelLocator(option);
    await this._click(locator);
  }
  async isRBOptionEnabled(option) {
    const locator = this._getRBInputLocator(option);
    const element = await this._find(locator);
    return await element.isEnabled();
  }
  async isRBOptionSelected(option) {
    const locator= this._getRBInputLocator(option);
    const element= await this._find(locator);
    return await element.isSelected();
  }
  async getRBOptionConfirmationText(){
    return await getDirectText(this.driver, { xpath: this.confirmationMessageXpath });
  }
  async getRBOptionConfirmation(){
    return await this._getText({ xpath: `${this.confirmationMessageXpath}//span` });
  }
  async verifyColor(){
    const locator= { xpath: `${this.confirmationMessageXpath}//span` };
    return await this._getColorValue(locator, 'color');
  }
}

module.exports= RadioButtonPage;