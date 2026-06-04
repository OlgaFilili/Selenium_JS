const AuthenticatedPage = require("../../../pages/book_store/AuthenticatedPage.js");
const ProfilePage = require("../../../pages/book_store/ProfilePage.js");
const {acceptAlert, getAlertText} =  require("../../../utils/AlertUtils.js");
const { scrollRelatively } = require("../../../utils/BrowserUtils.js");
const { loginTestUser } = require("../../helpers/LoginHelper.js");
const { registerNewUser } = require("../../helpers/RegisterHelper.js");
const { generateValidUser, extremeUsersPositive, userFields } = require("../../../testData/RegisterData.js");
const { expect }= require('chai');

describe('Registration functionality check', function() {
    /** @type {RegisterPage} */
    let loginPage, booksPage, registerPage, userPage;
    let newUser;
    beforeEach(async function(){
        newUser = generateValidUser();
        this.testUser= newUser;
        const homePage= this.homePage;
        await homePage.waitCardsVisible();
        booksPage= await homePage.gotoBookStoreApplication();
        loginPage= await booksPage.clickLoginButton();
        registerPage= await loginPage.clickNewUserButton();
    });
    afterEach(async function() {
        const currentUrl= await userPage.getProfilePageUrl();
        isOnProfilePage= currentUrl.includes('/profile');
        if (isOnProfilePage){
            await userPage.deleteAccount();
            await userPage.confirmAccountDeletion();
        } else {
            console.log('Skipped deletion, not on the Profile Page');
        }
    });
    describe('smoke: Basic successful functionality check', function(){
        // UI positive registration flow after several tries can be blocked by reCAPTCHA and cannot be reliably automated in this environment
        it('should successfully register new user', async function(){
            await registerNewUser(this.driver, newUser);
            const expectedAlert= "User Registered Successfully.";
            const actualAlert= await getAlertText(this.driver);
            expect(actualAlert, "Actual and expected alert messages do not match").to.be.equal(expectedAlert);
            await acceptAlert(this.driver);
            await scrollRelatively(this.driver, 0, 200);
            await registerPage.gotoLoginPage();
            await loginPage.waitNotLoggedInState();
            await loginTestUser(this);
            userPage= new ProfilePage(loginPage.driver);
            await scrollRelatively(this.driver, 0, -200);
            const actualUserName = await userPage.getUserName();
            expect(actualUserName, 'Actual and expected userNames do not match').to.be.equal(newUser[userFields.USER_NAME]);
        });
    });
    describe('regression: Basic successful functionality check', function(){
        describe('regression: Extreme inputs', function(){
            extremeUsersPositive.forEach(({user, overview}) =>{
                it(`should pass registration successfully for '${overview}' case`, async function(){
                    this.timeout(20000);
                    this.testUser = user;
                    await registerNewUser(this.driver, user);
                    await acceptAlert(this.driver);
                    await scrollRelatively(this.driver, 0, 200);
                    await registerPage.gotoLoginPage();
                    await loginPage.waitNotLoggedInState();
                    await loginTestUser(this);
                    userPage= new ProfilePage(loginPage.driver);
                    await scrollRelatively(this.driver, 0, -200);
                    const actualUserName = await userPage.getUserName();
                    expect(actualUserName, 'Actual and expected userNames do not match').to.be.equal(user[userFields.USER_NAME]);
                });
            });
        });
        it('should successfully register new user using keyboard navigation', async function(){
            await registerPage.inputUserInfoWithKeyboard(newUser);
            await acceptAlert(this.driver);
            await scrollRelatively(this.driver, 0, 200);
            await registerPage.gotoLoginPage();
            await loginPage.waitNotLoggedInState();
            await loginTestUser(this);
            userPage= new ProfilePage(loginPage.driver);
            await scrollRelatively(this.driver, 0, -200);
            const actualUserName = await userPage.getUserName();
            expect(actualUserName, 'Actual and expected userNames do not match').to.be.equal(newUser[userFields.USER_NAME]);
        });
    });
});