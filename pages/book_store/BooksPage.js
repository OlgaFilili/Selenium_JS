const AuthenticatedPage = require("./AuthenticatedPage.js");
const MainMenu = require("../../components/MainMenu.js");
const LoginPage = require("../book_store/LoginPage.js");
const { waitVisible } = require("../../utils/WaitUtils.js");
const { isInViewport } = require("../../utils/BrowserUtils.js");

class BooksPage extends AuthenticatedPage
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
        this.loginButton= { id: "login" };
    }

    async clickLoginButton(){
        await waitVisible(this.driver, this.loginButton);
        await this._click(this.loginButton);
        return new LoginPage(this.driver);
    }
    async isLoginButtonVisible(){
        const element= await waitVisible(this.driver, this.loginButton);
        return await isInViewport(this.driver, element);
    }

}
module.exports = BooksPage;