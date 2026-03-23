const api = require("../../../api");
const { loginTestUser } = require("../../helpers/LoginHelper.js");
const { logoutTestUser } = require("../../helpers/LogoutHelper.js");
const ProfilePage = require("../../../pages/book_store/ProfilePage.js");
const BooksTable = require("../../../components/BooksTable.js");
const { expect }= require('chai');


describe('BooksTable component functionality check', function() {
    /*!!!!!!!!!!!Check the sequence of column headers on the page!!!!!!!!!!
    Tests are written for: Image-> Title-> Author-> Publisher (-> Action- for logged-in state)
    Test in 'smoke: Basic functionality check, not logged-in state' suite and
    'smoke: Basic functionality check, logged-in state' suite
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    const formFields = {
        image: {placeholder: 'src', type: 'string'},
        a: {placeholder: 'href', type: 'string'},   // extracted from href
        title: {placeholder: 'text', type: 'string'},
        author: {placeholder: 'text', type: 'string'},
        publisher: {placeholder: 'text', type: 'string'}
    };
    function entry(image, ID, title, auth, pub) {
        return { image: image, a: ID, title: title, author: auth, publisher: pub };
    }
    function entryVisibleText(entry) {
        return (`${entry.title} ${entry.author} ${entry.publisher}`).replace(/\s+/g, ' ').trim();
    }
    function entryLink(entry) {
        return entry.a;
    }
    function entryImage(entry) {
        return entry.image;
    }
    const defaultEntries=[
         entry( '/assets/bookimage0-DrW2Lhj5.jpg', '/books?search=9781449325862', 'Git Pocket Guide', 'Richard E. Silverman', "O'Reilly Media")
        ,entry( '/assets/bookimage1-CeLeymOA.jpg', '/books?search=9781449331818', 'Learning JavaScript Design Patterns', 'Addy Osmani', "O'Reilly Media")
        ,entry( '/XFd6BbVk5OJxG8PU47Er//AFsdgoZ//9k=', '/books?search=9781449337711', 'Designing Evolvable Web APIs with ASP.NET', 'Glenn Block et al.', "O'Reilly Media")
        ,entry( '/Iugm4zE7LCJYyVdXJKEjcoI6YGcnvgY6mgs23zn8sLs3HbtJxjPbPP86ipUB//9k=', '/books?search=9781449365035', 'Speaking JavaScript', 'Axel Rauschmayer', "O'Reilly Media")
        ,entry( '/assets/bookimage0-DrW2Lhj5.jpg', '/books?search=9781491904244', "You Don't Know JS", 'Kyle Simpson', "O'Reilly Media")
        ,entry( '/assets/bookimage1-CeLeymOA.jpg', '/books?search=9781491950296', 'Programming JavaScript Applications', 'Eric Elliott', "O'Reilly Media")
        ,entry( '/XFd6BbVk5OJxG8PU47Er//AFsdgoZ//9k=', '/books?search=9781593275846', 'Eloquent JavaScript, Second Edition', 'Marijn Haverbeke', "No Starch Press")
        ,entry( '/Iugm4zE7LCJYyVdXJKEjcoI6YGcnvgY6mgs23zn8sLs3HbtJxjPbPP86ipUB//9k=', '/books?search=9781593277574', 'Understanding ECMAScript 6', 'Nicholas C. Zakas', "No Starch Press")
    ];
    describe('Books Table component check, not logged-in state', function() {
        /** @type {BooksTable} */
        let homePage, booksPage;
        beforeEach(async function(){
            homePage= this.homePage;
            await homePage.waitCardsVisible();
            booksPage= await homePage.gotoBookStoreApplication();
            await booksPage.waitLoginButton();
        });
        describe('smoke: Basic functionality check', function() {
            it('should confirm sequence of columns in table', async function() {
                const expectedSequence= "Image Title Author Publisher";
                const actualSequence= await booksPage.booksTable.getTableColumns();
                expect(actualSequence, "Actual and expected sequence of columns do not match").to.be.equal(expectedSequence);
            });
            it('should check redirection to the chosen book`s page', async function() {
                const expectedLink=entryLink(defaultEntries[2]);
                await booksPage.booksTable.gotoBook(defaultEntries[2].title);
                const actualLink= await booksPage.booksTable.getBookUrl();
                expect(actualLink, `Actual and expected links for '${defaultEntries[2].title}' book do not match`).to.be.include(expectedLink);
            });
        });
        describe('smoke: Pagination bottom menu default state check', function() {
            it('should check that buttons "Previous" and "Next" are disabled if there is only one page', async function() {
                const previousButtonState= await booksPage.booksTable.isPreviousButtonEnabled();
                const nextButtonState= await booksPage.booksTable.isNextButtonEnabled();
                expect(previousButtonState, "'Previous' Button is enabled").to.be.false;
                expect(nextButtonState, "'Next' Button is enabled").to.be.false;
            });
        });
        describe('regression: Live search functionality check', function(){
            it('should search books with the text', async function() {
                const searchText='des';
                await booksPage.booksTable.searchEntries(searchText);
                await booksPage.booksTable.waitForTableUpdate(8);
                const entriesTotal= await booksPage.booksTable.getTotalNotNullEntriesNumber();
                expect(entriesTotal, `Expected 2 entries, got ${entriesTotal}`).to.be.equal(2);
                let expectedEntry= defaultEntries[1];
                let inTable = await booksPage.booksTable.isEntryOnPage({title: expectedEntry.title,
                    auth: expectedEntry.author, pub: expectedEntry.publisher });
                expect(inTable, `Entry with '${searchText}' in ${defaultEntries[1].title} was not found`).to.be.true;
                expectedEntry= defaultEntries[2];
                inTable = await booksPage.booksTable.isEntryOnPage({title: expectedEntry.title,
                    auth: expectedEntry.author, pub: expectedEntry.publisher });
                expect(inTable, `Entry with '${searchText}' in ${defaultEntries[2].title} was not found`).to.be.true;
            });
            it('should display correct image for books after live search', async function() {
                // Known issue: Bug-019
                const searchText='des';
                await booksPage.booksTable.searchEntries(searchText);
                await booksPage.booksTable.waitForTableUpdate(8);
                let expectedEntry= defaultEntries[1];
                let expectedImageSrc= entryImage(expectedEntry);
                let actualImageSrc= await booksPage.booksTable.getImageSrc({title: expectedEntry.title, 
                    auth: expectedEntry.author });
                let actualPath = new URL(actualImageSrc).pathname;
                expect(actualPath, `Bug!!! Wrong image for ${defaultEntries[1].title}`).to.be.include(expectedImageSrc);
                expectedEntry= defaultEntries[2];
                expectedImageSrc= entryImage(expectedEntry);
                actualImageSrc= await booksPage.booksTable.getImageSrc({title: expectedEntry.title, 
                    auth: expectedEntry.author });
                actualPath = new URL(actualImageSrc).pathname;
                expect(actualPath, `Bug!!! Wrong image for ${defaultEntries[2].title}`).to.be.include(expectedImageSrc);
            });
            it('should display empty shelf if search text is missing', async function() {
                const searchText='na';
                await booksPage.booksTable.searchEntries(searchText);
                await booksPage.booksTable.waitForTableUpdate(8);
                const entriesTotal= await booksPage.booksTable.getTotalNotNullEntriesNumber();
                expect(entriesTotal, `Expected 0 entries, got ${entriesTotal}`).to.be.equal(0);
            });
            it('should expand search result when reduce text', async function() {
                const searchText='JavaScript ';
                await booksPage.booksTable.searchEntries(searchText);
                await booksPage.booksTable.waitForTableUpdate(8);
                const initialCount = await booksPage.booksTable.getTotalNotNullEntriesNumber();
                //console.log("Entries after first search: ", initialCount);
                await booksPage.booksTable.deleteCharsFromTextSearch();
                await booksPage.booksTable.waitForTableUpdate(initialCount);
                const expandedCount= await booksPage.booksTable.getTotalNotNullEntriesNumber();
                //console.log("Entries after backspacing: ", expandedCount);
                expect(expandedCount, "Entries did not expand after reducing text").to.be.greaterThan(initialCount);
                expect(expandedCount, "Total number of entries don`t equal 4").to.be.equal(4);
            });
        });
    });
    describe('Books Table component check, logged-in state', function(){
        /** @type {BooksTable} */
        let homePage, booksPage, loginPage, profilePage;
        before(async function(){
            this.testUser = await api.user.createUser();
        });
        beforeEach(async function() {
            homePage= this.homePage;
            await homePage.waitCardsVisible();
            booksPage= await homePage.gotoBookStoreApplication();
            loginPage= await booksPage.clickLoginButton();
            await loginTestUser(this);
        });
        afterEach(async function()  {
            await logoutTestUser(this);
        })
        after(async function() {
            await api.user.deleteUser(this.testUser);
        });
        describe('smoke: Basic functionality check', function() {
            it('should confirm sequence of columns in table', async function() {
                const expectedSequence= "Image Title Author Publisher Action";
                const profilePage= new ProfilePage(loginPage.driver);
                await profilePage.waitUserPageReady();
                const actualSequence= await profilePage.booksTable.getTableColumns();
                expect(actualSequence, "Actual and expected sequence of columns do not match").to.be.equal(expectedSequence);
            });
            it('should match user books in UI with backend data', async function() {
                const userBooks =this.testUser.books;
                const backendBooks = userBooks.map(b =>`${b.title} ${b.author} ${b.publisher}`.replace(/\s+/g, ' ').trim());
                const profilePage= new ProfilePage(loginPage.driver);
                await profilePage.waitUserPageReady();
                const uiBooks = await profilePage.booksTable.getDisplayedBooks();
                expect(uiBooks, 'User books list in backend and in Profile do not match').to.be.deep.equal(backendBooks);
            });
        });
    });
});