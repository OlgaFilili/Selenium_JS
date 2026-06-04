const ProfilePage = require("../../../pages/book_store/ProfilePage.js");
const { isAlertPresent, acceptAlert } =  require("../../../utils/AlertUtils.js");
const { scrollRelatively } = require("../../../utils/BrowserUtils.js");
const { loginTestUser } = require("../../helpers/LoginHelper.js");
const { registerNewUser } = require("../../helpers/RegisterHelper.js");
const { generateUserWithInvalidField, generateValidUser, generateUserWithOverrides, invalidPasswords, userFields, extremeUsersNegative } = require("../../../testData/RegisterData.js");
const { expect }= require('chai');

describe('Registration negative check', function() {
    /** @type {RegisterPage} */
    let loginPage, booksPage, registerPage, userPage;
    let invalidUser, newUser;
    beforeEach(async function(){
        const homePage= this.homePage;
        await homePage.waitCardsVisible();
        booksPage= await homePage.gotoBookStoreApplication();
        loginPage= await booksPage.clickLoginButton();
        registerPage= await loginPage.clickNewUserButton();
    });
    describe('regression: Negative functionality check', function(){
        describe('regression: Basic functionality check', function(){
            beforeEach(function(){
                newUser = generateValidUser();
            });
            it('should handle properly second try of the same user registration', async function(){
                this.timeout(20000);
                const expectedErrorMessage = "User exists!";
                await registerNewUser(this.driver, newUser);
                await acceptAlert(this.driver);
                await registerPage.inputUserInfo(newUser);
                await registerPage.clickRegisterButton();
                await scrollRelatively(this.driver, 0, 200);
                //Known issue: Bug-034 (error message disappears too fast)
                const stillDisplayed = await registerPage.isErrorMessageDisplayed();
                expect(stillDisplayed, "Error message disappeared too fast").to.be.true;
                const actualErrorMessage = await registerPage.getErrorMessage();
                expect(actualErrorMessage, `Actual '${actualErrorMessage}' and expected error messages do not match`).to.be.equal(expectedErrorMessage);
            });
        });
        describe('regression: Invalid and extreme inputs', function(){
            describe('regression: Extreme inputs', function(){
                //Known issue Bug-034 (error message disappears too fast)
                //Known ussues Bug-004, Bug-023, Bug-025 for overlength credentials, internal whitespace in password, and only whitespaces username
                extremeUsersNegative.forEach(({user, overview}) =>{
                    it(`should failed registration for '${overview}' case`, async function(){
                        await registerNewUser(this.driver, user);
                        if (await isAlertPresent(this.driver)) {
                            await acceptAlert(this.driver);
                            expect.fail(`ERROR!!! Known issue, registration succeeded for '${overview}'`);
                        }
                        const isDisplayed= await registerPage.isErrorMessageDisplayed();
                        expect(isDisplayed, "Error message disappeared too fast").to.be.true;
                    });
                });
            });
            describe.skip('regression: Invalid passwords', function(){
                //Skipped due to known issue Bug-034 (error message disappears too fast)
                invalidPasswords.forEach(({value, reason}) =>{
                    it(`should fail registration for '${reason}' in password`, async function(){
                        invalidUser= generateUserWithInvalidField(userFields.PASSWORD, value);
                        await registerPage.inputUserInfo(invalidUser);
                        await registerPage.clickRegisterButton();
                        await scrollRelatively(this.driver, 0, 200);
                        const stillDisplayed= await registerPage.isErrorMessageDisplayed();
                        expect(stillDisplayed, "Error message disappeared too fast").to.be.true;
                    });
                });
            });
        });
        describe('regression: negative flows integrity check', function(){
            it('should fail login-in for invalid credentials', async function(){
                invalidUser= generateUserWithInvalidField(userFields.PASSWORD, 'password');
                this.testUser=invalidUser;
                await registerPage.inputUserInfo(invalidUser);
                await registerPage.clickRegisterButton();
                await scrollRelatively(this.driver, 0, 200);
                await registerPage.waitForErrorMessageAppeared();
                await registerPage.gotoLoginPage();
                await loginPage.waitNotLoggedInState();
                await loginTestUser(this);
                const loginInFailed= await loginPage.isLoginInFailed();
                expect(loginInFailed, "Error! Successful authorization").to.be.true;
            });
        });
    });
});