const BasePage = require("../BasePage.js");
const MainMenu = require("../../components/MainMenu.js");
const { waitVisible, waitForDomStable } = require("../../utils/WaitUtils.js");
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
        this.backToLoginButton= { id: "gotologin"};
        this.registerButton= { id: "register"};
        this.errorMessage= { id: "name" };
        //this.captchaMessage= { xpath: "//div//p[@id='name']"};
    }
    async getRegisterPageUrl() {
        return await this._getUrl();
    }
    async getHeader(){
        await waitVisible(this.driver, this.registerButton);
        return this._getText(this.welcomeMessage);
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
    async inputUserInfo(user){
        const { firstname, lastname, userName, password } = user;
        await waitForDomStable(this.driver);
        await this.typeFirstname(firstname);
        await this.typeLastname(lastname);
        await this.typeUsername(userName);
        await this.typePassword(password);
    }
    async inputUserInfoWithKeyboard(user){
        const { firstname, lastname, userName, password } = user;
        await waitForDomStable(this.driver);
        await this.typeFirstname(firstname);
        await this._pressTab();
        await this.typeLastname(lastname);
        await this._pressTab();
        await this.typeUsername(userName);
        await this._pressTab();
        await this.typePassword(password);
        await this._pressEnter();
    }
    async getFirstNameValidity(){
        const element= await this._find(this.firstNameField);
        const isValid= await isInputValid(this.driver, element);
        return isValid;
    }
    async getLastNameValidity(){
        const element= await this._find(this.lastNameField);
        const isValid= await isInputValid(this.driver, element);
        return isValid;
    }
    async getUserNameValidity(){
        const element= await this._find(this.userNameField);
        const isValid= await isInputValid(this.driver, element);
        return isValid;
    }
    async getPasswordValidity(){
        const element= await this._find(this.passwordField);
        const isValid= await isInputValid(this.driver, element);
        return isValid;
    }
    async waitForErrorMessageAppeared(timeout = 2000) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const elements = await this._finds(this.errorMessage);
            if (elements.length > 0) 
                return true;
            await new Promise(r => setTimeout(r, 100));
        }
        return false;
    }
    async isErrorMessageDisplayed(){
        return await this._isDisplayed(this.errorMessage);
    }
    async getErrorMessage(){
        await waitVisible(this.driver, this.errorMessage);
        return await this._getText(this.errorMessage);
    }
    async verifyErrorMessageColor(){
        await waitVisible(this.driver, this.errorMessage);
        return await this._getColorValue(this.errorMessage, 'color');
    }
    async gotoLoginPage() {
        await this.waitPageReady();
        await this._click(this.backToLoginButton);
    }
    async isPasswordMasked() {
        await this.waitPageReady();
        const element = await this._find(this.passwordField);
        const passwordType = await this._getType(element);
        return  passwordType === "password";
    }
}
module.exports= RegisterPage;