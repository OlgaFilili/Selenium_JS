const BasePage = require("../BasePage.js");
const MainMenu = require("../../components/MainMenu.js");

class LoginPage extends BasePage
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
        this.mainHeader= { xpath: "//div//h1"};
        this.loginButton= { id: "login"};
        this.newUserButton= { id: "newUser"};
    }
    async getMainHeader(){
        return await this._getText(this.mainHeader);
    }
    async clickLoginButton(){
        await this._click(this.loginButton);
    }
    async clickNewUserButton(){
        await this._click(this.newUserButton);
    }
}
module.exports= LoginPage;