const ProfilePage = require("../../../pages/book_store/ProfilePage.js");
const { isAlertPresent, acceptAlert } =  require("../../../utils/AlertUtils.js");
const { scrollRelatively } = require("../../../utils/BrowserUtils.js");
const { loginTestUser } = require("../../helpers/LoginHelper.js");
const { registerNewUser } = require("../../helpers/RegisterHelper.js");
const { generateUserWithInvalidField, generateValidUser, generateUserWithOverrides, newUser, userFields, invalidPasswords, extremeUsersNegative } = require("../../../testData/RegisterData.js");
const { expect }= require('chai');

describe('Registration negative check', function() {
    /** @type {RegisterPage} */
    let loginPage, booksPage, registerPage, userPage;
    let user, trimmedUser, updatedUser;
    beforeEach(async function(){
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
    describe('regression: data normalization check', function(){
        it('should check normalization behavior for trailing spaces in credentials', async function(){
            // Known issues: Bug-003, Bug-010
            // Systemic/business-rule inconsistency: Bug-035
            this.timeout(20000);
            user = generateUserWithOverrides({[userFields.USER_NAME]: 36, [userFields.PASSWORD]: 36}, ' ');
            this.testUser = user;
            await registerNewUser(this.driver, user);
            await acceptAlert(this.driver);
            await scrollRelatively(this.driver, 0, 200);
            await registerPage.gotoLoginPage();
            await loginPage.waitNotLoggedInState();
            await loginTestUser(this);
            userPage= new ProfilePage(loginPage.driver);
            await scrollRelatively(this.driver, 0, -200);
            let actualUserName = await userPage.getUserName();
            expect(actualUserName, `Actual '${actualUserName}' and expected userNames do not match`).to.be.equal(user[userFields.USER_NAME]);
            await userPage.clickLogoutButton();
            trimmedUser=user;
            trimmedUser[userFields.USER_NAME]= user[userFields.USER_NAME].trim();
            trimmedUser[userFields.PASSWORD]= user[userFields.PASSWORD].trim();
            this.testUser=trimmedUser;
            await loginPage.waitNotLoggedInState();
            await loginTestUser(this);
            const loginInFailed= await loginPage.isLoginInFailed();
            this.authSucceeded = !loginInFailed;
            expect(loginInFailed, "Error! Successful authorization").to.be.true;
        });
        it('should check normalization behavior for leading spaces in credentials', async function(){
            // Systemic/business-rule inconsistency: Bug-035
            this.timeout(20000);
            user = Object.freeze(generateValidUser());
            updatedUser= newUser(user[userFields.FIRST_NAME], user[userFields.LAST_NAME], "  " + user[userFields.USER_NAME], "  " + user[userFields.PASSWORD] );
            this.testUser = updatedUser;
            await registerNewUser(this.driver, updatedUser);
            await acceptAlert(this.driver);
            await scrollRelatively(this.driver, 0, 200);
            await registerPage.gotoLoginPage();
            await loginPage.waitNotLoggedInState();
            await loginTestUser(this);
            userPage= new ProfilePage(loginPage.driver);
            await scrollRelatively(this.driver, 0, -200);
            let actualUserName = await userPage.getUserName();
            expect(actualUserName, `Actual '${actualUserName}' and expected userNames do not match`).to.be.equal(updatedUser[userFields.USER_NAME]);
            await userPage.clickLogoutButton();
            await loginPage.waitNotLoggedInState();
            this.testUser = user;
            await loginTestUser(this);
            const loginInFailed= await loginPage.isLoginInFailed();
            this.authSucceeded = !loginInFailed;
            expect(loginInFailed, "Error! Successful authorization").to.be.true;
        });
    });
});