const BasePage = require("../BasePage.js");
const { waitVisible }= require("../../utils/WaitUtils.js");

class AuthenticatedPage extends BasePage
{
  constructor(driver) {
    super(driver);
    this.buttonsTag= "//button[text()='";
    this.logoutButton= { xpath: "//button[@id='submit' and contains(text(),'ut')]"};
    this.userNameLabel = { xpath: "//div[contains(@class,'col-md-4')]//label[contains(@id,'label')]" };
    this.userNameValue = { id: "userName-value" };
  }
  async waitUserPageReady(){
    await waitVisible(this.driver, this.logoutButton);
  }
  async clickLogoutButton(){
    await waitVisible(this.driver, this.logoutButton);
    await this._click(this.logoutButton);
  }
  async getUserName(){
    await this.waitUserPageReady();
    return await this._getText(this.userNameValue);
  }
  async isUserNameDisplayed(){
    return await this._isDisplayed(this.userNameValue);
  }

}
module.exports= AuthenticatedPage;