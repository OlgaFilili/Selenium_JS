const RegisterPage = require("../../../pages/book_store/RegisterPage.js");
const { generateUserWithInvalidField, userFields } = require("../../../testData/RegisterData.js");
const { scrollRelatively } = require("../../../utils/BrowserUtils.js");
const { expect }= require('chai');

describe('Register Page UI check', function() {
    let loginPage, booksPage, registerPage;
    let invalidUser;
    before(function(){
        invalidUser= generateUserWithInvalidField(userFields.PASSWORD, 'password');
    });
    beforeEach(async function(){
        const homePage= this.homePage;
        await homePage.waitCardsVisible();
        booksPage= await homePage.gotoBookStoreApplication();
        loginPage= await booksPage.clickLoginButton();
        registerPage= await loginPage.clickNewUserButton();
    });
    describe('smoke: Basic UI check', function(){
        it('should check the visibility of register welcome message on the page', async function(){
            const actualMessage = await registerPage.getHeader();
            const expectedMessage= "Register to Book Store";
            expect(actualMessage, 'Actual and expected welcome messages do not match').to.be.equal(expectedMessage);
        });
        it('should fail register if all fields are empty', async function(){
            await registerPage.clickRegisterButton();
            let validity= await registerPage.getFirstNameValidity();           
            expect(validity, "First Name`s field frame is not red").to.be.false;
            validity= await registerPage.getLastNameValidity();           
            expect(validity, "Last Name`s field frame is not red").to.be.false;
            validity= await registerPage.getUserNameValidity();           
            expect(validity, "UserName`s field frame is not red").to.be.false;
            validity= await registerPage.getPasswordValidity();           
            expect(validity, "Password`s field frame is not red").to.be.false;
        });
        it('should show error message for invalid password', async function(){
            //Known issue: Bug-034 (error message disappears too fast)
            await registerPage.inputUserInfo(invalidUser);
            await registerPage.clickRegisterButton();
            await scrollRelatively(this.driver, 0, 200);
            const stillDisplayed= await registerPage.isErrorMessageDisplayed();
            expect(stillDisplayed, "Error message disappeared too fast").to.be.true;
        });
    });
    describe('regression: Basic UI check', function(){
        describe.skip('regression: Error message check', function(){
        //Skipped due to known issue Bug-034 (error message disappears too fast)
            it('should check the text of error message for invalid password', async function(){
                const errorMessage= "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.";
                await registerPage.inputUserInfo(invalidUser);
                await registerPage.clickRegisterButton();
                await scrollRelatively(this.driver, 0, 200);
                const actualErrorMessage= await registerPage.getErrorMessage();
                expect(actualErrorMessage, "Actual and expected error messages do not match").to.be.equal(errorMessage);
            });
            it('should check the color of the error message', async function(){
                await registerPage.inputUserInfo(invalidUser);
                await registerPage.clickRegisterButton();
                await scrollRelatively(this.driver, 0, 200);
                const actualErrorMessageColor= await registerPage.verifyErrorMessageColor();
                expect(actualErrorMessageColor, "Actual and expected error message colors do not match").to.be.equal("rgba(255, 0, 0, 1)");
            });
            it('should check the error message disappearing after new input in a field begins', async function(){
                await registerPage.inputUserInfo(invalidUser);
                await registerPage.clickRegisterButton();
                const isMessageDisplayed= await registerPage.isErrorMessageDisplayed();
                expect(isMessageDisplayed, "Error! message disappeared too fast").to.be.true;
                await registerPage.typePassword("P");
                const stillDisplayed= await registerPage.isErrorMessageDisplayed();
                expect(stillDisplayed, "Error! There is error message on page").to.be.false;
            });
        });
        it('should mask password input characters', async function () {
            const isMasked = await registerPage.isPasswordMasked();
            expect(isMasked, 'Password field is not masked').to.be.true;
        });
    });
});