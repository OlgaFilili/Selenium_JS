const { scrollToElement } = require('../utils/BrowserUtils');
const { waitClickable } = require('../utils/WaitUtils');
class BasePage 
{
  constructor(driver){
    this.driver=driver;
  }

  async _find (locator) {
    return await this.driver.findElement(locator);
  }

  async _click(locator) {
    let element;
    try {
      element = await waitClickable(this.driver, locator);
      await element.click();
    } catch (err) {
      if (err.name === 'ElementClickInterceptedError') {
        //console.warn(`⚠️ Click intercepted, retrying with scroll...`);
        element = await this._find(locator);
        await scrollToElement(this.driver, element);
        await element.click();
      } else {
        throw err;
      }
    }
  }

  /*async _click(locator) {
    let element= await this._find(locator);
    await element.click();
  }*/

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