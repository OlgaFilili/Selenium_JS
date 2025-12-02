const BasePage = require("../BasePage.js");
const MainMenu = require("../../components/MainMenu.js");
const { waitVisible } = require("../../utils/WaitUtils.js");

class BooksPage extends BasePage 
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
        this.loginButton= { id: "login"};
    }
    async clickLoginButton(){
        await this._click(this.loginButton);
    }
    async waitLoginButton(){
        await waitVisible(this.driver, this.loginButton);
    }

}
module.exports = BooksPage;