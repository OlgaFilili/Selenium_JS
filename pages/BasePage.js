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

  /*async _getmessage(locator) {
    let element= await this.find(locator);
    return await element.text();
  }*/

}

module.exports = BasePage;