const AuthenticatedPage = require("./AuthenticatedPage.js");
const MainMenu = require("../../components/MainMenu.js");
const { waitVisible } = require("../../utils/WaitUtils.js");

class ProfilePage extends AuthenticatedPage
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
        this.notLogginMessage= { id: "notLoggin-label" };
        this.loginLink= { xpath: "//label[@id='notLoggin-label']//a[text()='login']" };
        this.registerLink= { xpath: "//label[@id='notLoggin-label']//a[text()='register']" };
        this.gotoStoreButton= { id: "gotoStore" };
        this.deleteAccountButtonText= "Delete Account";
        this.deleteAllBooksButtonText= "Delete All Books";
    }
    _getdeleteAccountButtonLocator(){
        return { xpath: `${this.buttonsTag}${this.deleteAccountButtonText}']`};
    }
    _getDeleteAllBooksButtonLocator(){
        return { xpath: `(${this.buttonsTag}${this.deleteAllBooksButtonText}'])[2]`};
    }
    async getProfilePageUrl() {
        return await this._getUrl();
    }
    async waitNotLogginState(){
        await waitVisible(this.driver, this.notLogginMessage);
    }
    async getNotLogginMessage(){
        await this.waitNotLogginState();
        const textLines= await this._finds(this.notLogginMessage);
        const Message= await Promise.all(textLines.map(text => this._getText(text)));
        return Message.join(' ').replace(/\s+/g, ' ').trim();
    }
    async gotoBookStore(){
        await this._click(this.gotoStoreButton);
    }
    async gotoLoginPage(){
        await this.waitNotLogginState();
        await this._click(this.loginLink);
    }
    async gotoRegisterPage(){
        await this.waitNotLogginState();
        await this._click(this.registerLink);    
    }
    async getLabelText(){
        await this.waitUserPageReady();
        const labels= await this._finds(this.userNameLabel);
        const labelsText= await Promise.all(labels.map(el => this._getText(el)));
        return labelsText.join('&');
    }
}
module.exports= ProfilePage;