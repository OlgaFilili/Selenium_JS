const { getHomePage } = require("../../BaseTest.js");
const ProfilePage = require("../../../pages/book_store/ProfilePage.js");
const { getPageByMenuItem } = require("../../../utils/PageFactoryUtils.js");
const { loginTestUser } = require("../../helpers/LoginHelper.js");
const api = require("../../../api");
const { expect }= require('chai');
const LoginPage = require("../../../pages/book_store/LoginPage.js");


describe('Profile Page UI check', function() {
    /** @type {ProfilePage} */
    let profilePage, booksPage, userPage;
    let testUser;
    before(async function () {
        testUser = await api.user.createUser();
    });
    beforeEach(async function(){
        const homePage= await getHomePage();
        booksPage= await homePage.gotoBookStoreApplication();
        await booksPage.menu.clickMenuItem("Book Store Application", "Profile");
        this.profilePage= await getPageByMenuItem(this.driver, "Profile");
    });
    describe('smoke: Basic UI check', function(){
        describe('not logged in state of the page', function(){
            it('should check the visibility of not-logged in message on the page', async function(){
                const actualMessage = await profilePage.getNotLogginMessage();
                const expectedMessage= "Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.";
                expect(actualMessage, 'Actual and expected not-logged in messages do not match').to.be.equal(expectedMessage);
            });
            it('should check the link to the login page', async function(){
            });
            it('should check the link to the register page', async function(){
            });
        });
        describe('logged in state of the page', function(){
            beforeEach(async function () {
                await this.profilePage.gotoLoginPage();
                await loginTestUser(this, testUser);
            });
            it.only('should login in', async function(){
                await this.profilePage.waitUserPageReady();
                const currentUrl= await this.profilePage.getProfilePageUrl();
                expect(currentUrl, "Error! Wrong redirect link").to.be.include("/profile");
            });
        });
    });
    describe('regression: Basic UI check', function(){
        describe('not-logged in state of the page', function(){
        });
        describe('logged in state of the page', function(){
        });
    });
});