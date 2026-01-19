const { getHomePage } = require("../../BaseTest.js");
const { getPageByMenuItem } = require("../../../utils/PageFactoryUtils.js");
const { loginTestUser } = require("../../helpers/LoginHelper.js");
const ProfilePage = require("../../../pages/book_store/ProfilePage.js");
const api = require("../../../api");
const { expect }= require('chai');


describe('Profile Page UI check', function() {
    /** @type {ProfilePage} */
    let profilePage, booksPage, userPage;
    before(async function() {
        this.testUser = await api.user.createUser();
    });
    beforeEach(async function(){
        const homePage= await getHomePage();
        booksPage= await homePage.gotoBookStoreApplication();
        await booksPage.menu.clickMenuItem("Book Store Application", "Profile");
        profilePage= await getPageByMenuItem(this.driver, "Profile");
    });
    after(async function(){
        await api.user.deleteUser(this.testUser);
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
            beforeEach(async function() {
                await profilePage.gotoLoginPage();
                await loginTestUser(this);
            });
            afterEach(async function() {
                await profilePage.clickLogoutButton();
            });
            it.only('should login in', async function(){
                await profilePage.waitUserPageReady();
                const actualLoggedInUsername= await profilePage.getUserName();
                //console.log(actualLoggedInUsername);
                //console.log(this.testUser);
                //const currentUrl= await profilePage.getProfilePageUrl();
                expect(actualLoggedInUsername, 'Error!!! Wrong logged-in Username').to.be.equal(this.testUser.userName);
            });
        });
    });
    describe('regression: Basic UI check', function(){
        describe('not-logged in state of the page', function(){
        });
        describe('logged in state of the page', function(){
            beforeEach(async function () {
                await profilePage.gotoLoginPage();
                await loginTestUser(this);
            });
            afterEach(async function() {
                await profilePage.clickLogoutButton();
            });
            it('should blah-blah-blah', async function(){
            });
        });
    });
});