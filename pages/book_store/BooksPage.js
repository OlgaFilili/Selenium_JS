const BasePage = require("../BasePage.js");
const MainMenu = require("../../components/MainMenu.js");
const { waitVisible } = require("../../utils/WaitUtils.js");
const { isInViewport } = require("../../utils/BrowserUtils.js");

class BooksPage extends BasePage 
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
        this.loginButton= { id: "login"};
    }
    async waitPageReady(){
        await waitVisible(this.driver, this.loginButton);
    }
    async clickLoginButton(){
        await this.waitPageReady();
        await this._click(this.loginButton);
    }
    async isLoginButtonVisible(){
        const element= await waitVisible(this.driver, this.loginButton);
        return await isInViewport(this.driver, element);
    }
}
module.exports = BooksPage;