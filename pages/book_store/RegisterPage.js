const BasePage = require("../BasePage.js");
const MainMenu = require("../../components/MainMenu.js");
const { waitVisible } = require("../../utils/WaitUtils.js");
const { isInputValid } = require("../../utils/BrowserUtils.js");

class RegisterPage extends BasePage
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
        this.mainHeader= { xpath: "//div//h1"};
        this.welcomeMessage= { xpath: "//form//h4" };
        this.firstNameField= { id: "firstname"};
        this.lastNameField= { id: "lastname"};
        this.userNameField= { id: "userName"};
        this.passwordField= { id: "password"};
        this.gotoLoginButton= { id: "gotologin"};
        this.registerButton= { id: "register"};
        this.errorMessage= { id: "name" }; 
    }
    async getRegisterPageUrl() {
        return await this._getUrl();
    }
    async waitPageReady(){
        await waitVisible(this.driver, this.registerButton);
    }
    async clickRegisterButton(){
        await this._click(this.registerButton);
    }
    async typeFirstname(randomString){
        await this._set(this.firstNameField, randomString);
    }
    async typeLastname(randomString){
        await this._set(this.lastNameField, randomString);
    }
    async typeUsername(randomString){
        await this._set(this.userNameField, randomString);
    }
    async typePassword(randomString){
        await this._set(this.passwordField, randomString);
    }
    async inputUserInfo(firstname, lastname, username, password){
        await this.waitUserPageReady();
        await this.typeFirstname(firstname);
        await this.typeLastname(lastname);
        await this.typeUsername(username);
        await this.typePassword(password);
    }
    async loginWithKeyboard(firstname, lastname, username, password){
        await this.waitUserPageReady();
        await this.typeFirstname(firstname);
        await this._pressTab();
        await this.typeLastname(lastname);
        await this._pressTab();
        await this.typeUsername(username);
        await this.typePassword(password);
        await this._pressEnter();
    }
    async getFirstnameValidity(){
        const element= await this._find(this.firstNameField);
        const isValid= await isInputValid(this.driver, element);
        return isValid;
    }
    async getLastNameValidity(){
        const element= await this._find(this.lastNameField);
        const isValid= await isInputValid(this.driver, element);
        return isValid;
    }
    async getUsernameValidity(){
        const element= await this._find(this.userNameField);
        const isValid= await isInputValid(this.driver, element);
        return isValid;
    }
    async getPasswordValidity(){
        const element= await this._find(this.passwordField);
        const isValid= await isInputValid(this.driver, element);
        return isValid;
    }
    async isErrorMessageDisplayed(){
        const isDisplayed= await this._isDisplayed(this.errorMessage);
        return isDisplayed;
    }
    async verifyErrorMessageColor(){
        await waitVisible(this.driver, this.errorMessage);
        return await this._getColorValue(this.errorMessage, 'color');
    }
    async goToLoginPage() {
        await this.waitPageReady();
        await this._click(this.gotoLoginButton);
    }
    async isPasswordMasked() {
        const element = await this._find(this.passwordField);
        const passwordType = await this._getType(element);
        return  passwordType === "password";
    }
}
module.exports= RegisterPage;