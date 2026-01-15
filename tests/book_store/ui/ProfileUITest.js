const { getHomePage }= require("../../BaseTest.js");
const ProfilePage = require("../../../pages/book_store/ProfilePage.js");
const { getPageByMenuItem } = require("../../../utils/PageFactoryUtils.js");
const { expect }= require('chai');


describe('Profile Page UI check', function() {
    /** @type {ProfilePage} */
    let profilePage, booksPage, userPage;
    beforeEach(async function(){
        const homePage= await getHomePage();
        booksPage= await homePage.gotoBookStoreApplication();
        await booksPage.menu.clickMenuItem("Book Store Application", "Profile");
        profilePage= await getPageByMenuItem(this.driver, "Profile");
    });
    describe('smoke: Basic UI check', function(){
        describe('not loggin state of the page', function(){
            it('should check the visibility of not loggin message on the page', async function(){
                const actualMessage = await profilePage.getNotLogginMessage();
                const expectedMessage= "Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.";
                expect(actualMessage, 'Actual and expected not loggin messages do not match').to.be.equal(expectedMessage);
            });
            it('should check the link to the login page', async function(){
            });
            it('should check the link to the register page', async function(){
            });
        });
        describe('loggin state of the page', function(){
        });
    });
    describe('regression: Basic UI check', function(){
        describe('not loggin state of the page', function(){
        });
        describe('loggin state of the page', function(){
        });
    });
});