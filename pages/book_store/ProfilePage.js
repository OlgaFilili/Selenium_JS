const AuthenticatedPage = require("./AuthenticatedPage.js");
const MainMenu = require("../../components/MainMenu.js");

class ProfilePage extends AuthenticatedPage
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
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
    /*async getMessage(){
        const elements= this._finds(this.formLabel);
        const text= await Promise.all(elements.map(el => this._getText(el)));
        return text.join('');
    }*/
}
module.exports= ProfilePage;