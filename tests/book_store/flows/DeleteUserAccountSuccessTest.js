const { getHomePage } = require("../../BaseTest.js");
const { getPageByMenuItem } = require("../../../utils/PageFactoryUtils.js");
const api = require("../../../api");
const { loginTestUser } = require("../../helpers/LoginHelper.js");
const ProfilePage = require("../../../pages/book_store/ProfilePage.js");
const LoginPage = require("../../../pages/book_store/LoginPage.js");
const { getAlertText, acceptAlert } = require("../../../utils/AlertUtils.js");
const { expect }= require('chai');

describe('Delete User Account flow check', function() {
    /** @type {ProfilePage} */
    let profilePage, booksPage, loginPage;
    before(async function() {
        this.testUser = await api.user.createUser();
    });
    beforeEach(async function() {
        const homePage= await getHomePage();
        booksPage= await homePage.gotoBookStoreApplication();
        await booksPage.menu.clickMenuItem("Book Store Application", "Profile");
        profilePage= await getPageByMenuItem(this.driver, "Profile");
    });
    describe('smoke: Basic flow check', function() {
        beforeEach(async function() {
            await profilePage.gotoLoginPage();
            await loginTestUser(this);
        });
        it('should check the delete modal dialog visibility', async function(){
            const errorMessage="Invalid username or password!";
            const alertMessage="User Deleted.";
            await profilePage.waitUserPageReady();
            await profilePage.deleteAccount();
            await profilePage.confirmAccountDeletion();
            const alertText = await getAlertText(this.driver);
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
});