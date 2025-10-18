class BasePage 
{
  constructor(driver){
    this.driver=driver;
  }

  async _find (locator) {
    return await this.driver.findElement(locator);
  }

  async _click(locator) {
    let element= await this._find(locator);
    await element.click();
  }

  async _set(locator, text) {
    let element= await this._find(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  /** @returns {Promise<string>} */
  async _getText(locator) {
    let element= await this._find(locator);
    return element.getText();
  }

  async _getColorValue(locator, CSSProperty) {
    let element= await this._find(locator);
    return element.getCssValue(CSSProperty);
  }

}

module.exports = BasePage;