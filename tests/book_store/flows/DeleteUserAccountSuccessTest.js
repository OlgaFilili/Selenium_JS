const { getPageByMenuItem } = require("../../../utils/PageFactoryUtils.js");
const api = require("../../../api");
const { loginTestUser } = require("../../helpers/LoginHelper.js");
const ProfilePage = require("../../../pages/book_store/ProfilePage.js");
const LoginPage = require("../../../pages/book_store/LoginPage.js");
const { refreshPage }= require("../../../utils/BrowserUtils.js");
const { getAlertText, acceptAlert } = require("../../../utils/AlertUtils.js");
const { expect }= require('chai');

describe('Delete User Account flow check', function() {
    /** @type {ProfilePage} */
    let profilePage, booksPage, loginPage;
    before(async function() {
        this.testUser = await api.user.createUser();
    });
    beforeEach(async function() {
        const homePage= this.homePage;
        await homePage.waitCardsVisible();
        booksPage= await homePage.gotoBookStoreApplication();
        await booksPage.menu.clickMenuItem("Book Store Application", "/profile");
        profilePage= await getPageByMenuItem(this.driver, "Profile");
        await profilePage.gotoLoginPage();
        await loginTestUser(this);
    });
    describe('smoke: Basic successful deletion flow check', function(){
        it.skip('should check the delete modal dialog and confirmation alert visibility', async function(){
            // Knowing issue: Bug-032
            const errorMessage="Invalid username or password!";
            const alertMessage="User Deleted.";
            await profilePage.waitUserPageReady();
            await profilePage.deleteAccount();
            await profilePage.confirmAccountDeletion();
            const alertText = await getAlertText(this.driver);
            //console.log(alertText);
            // Actual: no AlertMessage
            expect(alertText, "Actual and expected alert messages do not match").to.be.equal(alertMessage);
            await acceptAlert(this.driver);
            loginPage= new LoginPage(profilePage.driver);
            await loginPage.waitNotLoggedInState();
            const currentUrl= await loginPage.getLoginPageUrl();
            expect(currentUrl, "Error! Wrong redirect link").to.be.include("/login");
            await loginPage.inputCredentials(this.testUser.userName, this.testUser.password);
            const loginInFailed= await loginPage.isLoginInFailed();
            expect(loginInFailed, "Error! System behaved unexpectedly").to.be.true;
            const ActualErrorMessage= await loginPage.getErrorMessage();
            expect(ActualErrorMessage, "Actual and expected error messages do not match").to.be.equal(errorMessage);
        });
    });
    describe('regression: Handle of expired token session check', function(){
        it('should check previous token login session closes correctly after account deletion', async function(){
            //Knowing issue: Bug-031
            // Note: In a previous release this flow failed with Bug-020
            // Current behavior changed after release, but the session invalidation problem still persists
            await profilePage.waitUserPageReady();
            await api.user.deleteUser(this.testUser);
            await refreshPage(profilePage.driver);
            await profilePage.waitUserNotFoundMessage();
            const expectedMessage= "User not found!";
            const actualMessage= await profilePage.getUserNotFoundMessage();
            expect(actualMessage, "Actual and expected messags do not match").to.be.equal(expectedMessage);
            const actualMessageColor= await profilePage.getUserNotFoundMessageColor();
            expect(actualMessageColor, "Actual and expected 'User not found!' message colors do not match").to.be.equal("rgba(255, 0, 0, 1)");
            await profilePage.menu.clickMenuItem("Book Store Application", "/login")
            loginPage= await getPageByMenuItem(this.driver, "Login");
            const isLoggedIn= await loginPage.isLoginPageInAuthState();
            expect(isLoggedIn, "Error! LoginPage in authenticated state").to.be.false;
            // Expected: user should be redirected to logged-out state of login page
            // Actual: login page in logged-in state
            await loginPage.waitNotLoggedInState();
            await loginPage.inputCredentials(this.testUser.userName, this.testUser.password);
            const loginInFailed= await loginPage.isLoginInFailed();
            expect(loginInFailed, "Error! System behaved unexpectedly").to.be.true;
        });
    });
});