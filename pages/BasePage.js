const driver= require('../utils/driver')
class BasePage 
{

  async _open(path) {
    await driver.get(path);
  }

  async _find (locator) {
    return await driver.findElement(locator);
  }

  async _click(locator) {
    let element= await this.find(locator);
    await element.click();
  }

  async _set(locator, text) {
    let element= await this.find(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  /*async _getmessage(locator) {
    let element= await this.find(locator);
    return await element.text();
  }*/

}

module.exports = BasePage;