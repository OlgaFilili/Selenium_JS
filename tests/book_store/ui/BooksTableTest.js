const api = require("../../../api");
const { loginTestUser } = require("../../helpers/LoginHelper.js");
const { logoutTestUser } = require("../../helpers/LogoutHelper.js");
const BooksPage = require("../../../pages/book_store/BooksPage.js");
const { expect }= require('chai');

describe('BooksTable component functionality check', function() {
    /*!!!!!!!!!!!Check the sequence of column headers on the page!!!!!!!!!!
    Tests are written for: Image-> Title-> Author ->Publisher-> Action
    Second test of 'smoke: Basic functionality check' suite!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    const formFields = {
        image: {placeholder: 'src', type: 'string'},
        href: {placeholder: 'a', type: 'string'},   // extracted from href
        title: {placeholder: 'text', type: 'string'},
        author: {placeholder: 'text', type: 'string'},
        publisher: {placeholder: 'text', type: 'string'}
    };
    function entry(image, ID, title, auth, pub) {
        return { image: image, href: ID, title: title, author: auth, publisher: pub };
    }
    const placeholders = Object.values(formFields).map(f => f.placeholder);
    const keys = Object.keys(formFields);
    const rowsPerPage= [5, 10, 20, 25, 50, 100];
    const defaultEntries=[
         entry( '/images/bookimage0.jpg', '/books?book=9781449325862', 'Git Pocket Guide', 'Richard E. Silverman', "O'Reilly Media")
        ,entry( '/images/bookimage1.jpg', '/books?book=9781449331818', 'Learning JavaScript Design Patterns', 'Addy Osmani', "O'Reilly Media")
        ,entry( '/images/bookimage2.jpg', '/books?book=9781449337711', 'Designing Evolvable Web APIs with ASP.NET', 'Glenn Block et al.', "O'Reilly Media")
        ,entry( '/images/bookimage3.jpg', '/books?book=9781449365035', 'Speaking JavaScript', 'Axel Rauschmayer', "O'Reilly Media")
        ,entry( '/images/bookimage0.jpg', '/books?book=9781491904244', "You Don't Know JS", 'Kyle Simpson', "O'Reilly Media")
        ,entry( '/images/bookimage1.jpg', '/books?book=9781491950296', 'Programming JavaScript Applications', 'Eric Elliott', "O'Reilly Media")
        ,entry( '/images/bookimage2.jpg', '/books?book=9781593275846', 'Eloquent JavaScript, Second Edition', 'Marijn Haverbeke', "No Starch Press")
        ,entry( '/images/bookimage3.jpg', '/books?book=9781593277574', 'Understanding ECMAScript 6', 'Nicholas C. Zakas', "No Starch Press")
    ];
    /** @type {BooksPage} */
    let homePage, booksTablePage;
    beforeEach(async function(){
        //this.testUser = await api.user.createUser();
        homePage= this.homePage;
        booksTablePage= await homePage.gotoBookStoreApplication();
        await booksTablePage.waitLoginButton();
        //await booksPage.clickLoginButton();
        //await loginTestUser(this);
    });
    afterEach(async function() {
        //await logoutTestUser(this);
        //await api.user.deleteUser(this.testUser);
    });
    describe('smoke: Basic functionality check, not logged-in state', function() {
        it('should confirm sequence of columns in table', async function() {
            const expectedSequence= "Image Title Author Publisher";
            const actualSequence= await booksTablePage.booksTable.getTableColumns();
            expect(actualSequence, "Actual and expected sequence of columns do not match").to.be.equal(expectedSequence);
        });
    });
    describe('smoke: Pagination bottom menu default state check, not logged-in state', function() {
        it('should check the number of rows showed per page by default', async function() {
            const defaultRowsPerPage= await booksTablePage.booksTable.rowsPerPage();
            const expectedValue=10;
            expect(defaultRowsPerPage, `Expected and actual rows amount ${defaultRowsPerPage} do not match`).to.be.equal(expectedValue);
        });
        it('should check the text for number of rows showed per page by default', async function() {
            const defaultRowsPerPageText= await booksTablePage.booksTable.rowsPerPageText();
            const expectedValue='10 rows';
            expect(defaultRowsPerPageText, `Expected and actual rows amount ${defaultRowsPerPageText} do not match`).to.be.equal(expectedValue);
        });
        it('should check the list of available numbers of rows showed per page', async function() {
            const optionsList= await booksTablePage.booksTable.listRowsPerPage();
            expect(optionsList, `Expected and actual rows amount ${optionsList} do not match`).to.deep.equal(rowsPerPage);
        });
        it('should check the list of available numbers of rows text showed per page', async function() {
            const optionsList= await booksTablePage.booksTable.listRowsPerPageText();
            const expectedList = rowsPerPage.map(n => `${n} rows`);
            expect(optionsList, `Expected and actual rows amount ${optionsList} do not match`).to.deep.equal(expectedList);
        });
        it('should change the number of rows showed per page', async function() {
            const expectedRowsPerPage= 20;
            await booksTablePage.booksTable.setRowsPerPage(expectedRowsPerPage);
            const actualRowsPerPage= await booksTablePage.booksTable.rowsPerPage();
            expect(actualRowsPerPage, `Expected and actual new number of rows do not match`).to.be.equal(expectedRowsPerPage);
        });
        it('should check that buttons "Previous" and "Next" are disabled', async function() {
            const previousButtonState= await booksTablePage.booksTable.isPreviousButtonEnabled();
            const nextButtonState= await booksTablePage.booksTable.isNextButtonEnabled();
            expect(previousButtonState, "'Previous' Button is enabled").to.be.false;
            expect(nextButtonState, "'Next' Button is enabled").to.be.false;
        });
    });
    describe('regression: Live search functionality check', function(){
        it('should search text through the page', async function() {
            const searchText='rra';
            await webTablesPage.searchEntries(searchText);
            const entriesTotal= await webTablesPage.getTotalNotNullEntriesNumber();
            expect(entriesTotal, `Total number of entries don't equal ${entriesTotal}`).to.be.equal(2);
            let entryString = keys.map(k => defaultEntries[0][k]).join(' ');
            let inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with ${searchText} in ${defaultEntries[0].FirstName} was not found`).to.be.true;
            entryString = keys.map(k => defaultEntries[2][k]).join(' ');
            inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with ${searchText} in ${defaultEntries[2].FirstName} was not found`).to.be.true;
        });
        it('should display empty table if search text is missing', async function() {
            const searchText='na';
            await webTablesPage.searchEntries(searchText);
            const entriesTotal= await webTablesPage.getTotalNotNullEntriesNumber();
            expect(entriesTotal, `Total number of entries don't equal ${entriesTotal}`).to.be.equal(0);
        });
        it('should search text through several pages of entries and include new added entries', async function() {
            await webTablesPage.setRowsPerPage(5);
            const dataEntry = testUsers.map(user => keys.map(k => user[k]));
            await webTablesPage.addNewEntry(placeholders, ...dataEntry);
            await webTablesPage.waitPreviousButton();
            const searchText='2';
            await webTablesPage.searchEntries(searchText);
            const entriesTotal= await webTablesPage.getTotalNotNullEntriesNumber();
            expect(entriesTotal, `Total number of entries don't equal ${entriesTotal}`).to.be.equal(4);
            let entryString = keys.map(k => defaultEntries[1][k]).join(' ');
            let inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with ${searchText} in ${defaultEntries[1].Salary} was not found`).to.be.true;
            entryString = keys.map(k => defaultEntries[2][k]).join(' ');
            inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with ${searchText} in ${defaultEntries[2].Age} and ${defaultEntries[2].Salary} was not found`).to.be.true;
            entryString = keys.map(k => testUsers[1][k]).join(' ');
            inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with ${searchText} in ${testUsers[1].LastName} and ${testUsers[1].Email} was not found`).to.be.true;
            entryString = keys.map(k => testUsers[2][k]).join(' ');
            inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with ${searchText} in ${testUsers[2].Department} was not found`).to.be.true;
        });
        it('should expand search result when reduce text', async function() {
            await webTablesPage.setRowsPerPage(5);
            const dataEntry = testUsers.map(user => keys.map(k => user[k]));
            await webTablesPage.addNewEntry(placeholders, ...dataEntry);
            await webTablesPage.waitForTableUpdate(3);
            const searchText='example.e';
            await webTablesPage.searchEntries(searchText);
            const initialCount = await webTablesPage.getTotalNotNullEntriesNumber();
            //console.log("Entries after first search: ", initialCount);
            await webTablesPage.deleteCharsFromTextSearch();
            await webTablesPage.waitForTableUpdate(initialCount);
            const expandedCount= await webTablesPage.getTotalNotNullEntriesNumber();
            //console.log("Entries after backspacing: ", expandedCount);
            expect(expandedCount, "Entries did not expand after reducing text").to.be.greaterThan(initialCount);
            expect(expandedCount, "Total number of entries don`t equal 4").to.be.equal(4);
            let entryString = keys.map(k => testUsers[0][k]).join(' ');
            let inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with 'example.' in ${testUsers[0].Email} was not found`).to.be.true;
            entryString = keys.map(k => defaultEntries[0][k]).join(' ');
            inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with 'example.' in ${defaultEntries[0].Email} was not found`).to.be.true;
            entryString = keys.map(k => defaultEntries[1][k]).join(' ');
            inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with 'example.' in ${defaultEntries[1].Email} was not found`).to.be.true;
            entryString = keys.map(k => defaultEntries[2][k]).join(' ');
            inTable=await webTablesPage.isEntryOnPage(entryString);
            expect(inTable, `Entry with 'example.' in ${defaultEntries[2].Email} was not found`).to.be.true;
        });
        it('should check that search result could include more than one page', async function() {
            await webTablesPage.setRowsPerPage(5);
            const dataEntry = testUsers.map(user => keys.map(k => user[k]));
            await webTablesPage.addNewEntry(placeholders, ...dataEntry);
            await webTablesPage.waitForTableUpdate(3);
            const searchText='@';
            await webTablesPage.searchEntries(searchText);
            await webTablesPage.clickNextPageButton();
            const searchTextNextPage= await webTablesPage.getSearchFieldValue();
            expect(searchTextNextPage, "Search text does not match with typed on the previous page").to.be.equal(searchText);
        });
    });
    describe('regression: Pagination bottom menu check', function() {
        it('should check the text for number of rows showed per page by default', async function() {
            const defaultRowsPerPageText= await webTablesPage.rowsPerPageText();
            const expectedValue='10 rows';
            expect(defaultRowsPerPageText, `Expected and actual rows amount ${defaultRowsPerPageText} do not match`).to.be.equal(expectedValue);
        });
        it('should display more than one page', async function() {
            const dataEntry = testUsers.map(user => keys.map(k => user[k]));
            //const expectedEntry = dataEntry.join(' ');
            await webTablesPage.addNewEntry(placeholders, ...dataEntry);
            await webTablesPage.waitPreviousButton();
            await webTablesPage.setRowsPerPage(5);
            const totalPages= await webTablesPage.getTotalPages();
            const nextButtonState= await webTablesPage.isNextButtonEnabled();
            const previousButtonState= await webTablesPage.isPreviousButtonEnabled();
            const actualPageNumber= await webTablesPage.getCurrentPageNumber();
            expect(actualPageNumber, "Actual and expected current page number do not match").to.be.equal(1);
            expect(totalPages, "Actual and expected total pages numbers do not match").to.be.equal(2);
            expect(nextButtonState, "'Next' Button is not enabled").to.be.true;
            expect(previousButtonState, "'Previous' Button is enabled").to.be.false;
        });
        it('should switch to the next page', async function() {
            const dataEntry = testUsers.map(user => keys.map(k => user[k]));
            //const expectedEntry = dataEntry.join(' ');
            await webTablesPage.addNewEntry(placeholders, ...dataEntry);
            await webTablesPage.waitPreviousButton();
            await webTablesPage.setRowsPerPage(5);
            await webTablesPage.clickNextPageButton();
            const totalPages= await webTablesPage.getTotalPages();
            const nextButtonState= await webTablesPage.isNextButtonEnabled();
            const previousButtonState= await webTablesPage.isPreviousButtonEnabled();
            const actualPageNumber= await webTablesPage.getCurrentPageNumber();
            const notNullEntriesOnPage= await webTablesPage.getTotalNotNullEntriesNumber();
            expect(notNullEntriesOnPage, "Actual and expected amount of entries on page do not match").to.be.equal(1);
            expect(actualPageNumber, "Actual and expected current page number do not match").to.be.equal(2);
            expect(totalPages, "Actual and expected total pages numbers do not match").to.be.equal(2);
            expect(nextButtonState, "'Next' Button is enabled").to.be.false;
            expect(previousButtonState, "'Previous' Button is  not enabled").to.be.true;
        });
        it('should display corresponding number of pages and current page after switching to bigger amount', async function() {
            await webTablesPage.setRowsPerPage(5);
            const dataEntry = testUsers.map(user => keys.map(k => user[k]));
            //const expectedEntry = dataEntry.join(' ');
            await webTablesPage.addNewEntry(placeholders, ...dataEntry);
            await webTablesPage.waitPreviousButton();
            await webTablesPage.clickNextPageButton();
            await webTablesPage.setRowsPerPage(10);
            await webTablesPage.closeRowsPerPageDropdown();
            const actualPageNumber= await webTablesPage.getCurrentPageNumber();
            const totalPages= await webTablesPage.getTotalPages();
            const nextButtonState= await webTablesPage.isNextButtonEnabled();
            const previousButtonState= await webTablesPage.isPreviousButtonEnabled();
            expect(totalPages, "Actual and expected total pages numbers do not match").to.be.equal(1);
            expect(actualPageNumber, "Actual and expected current page number do not match").to.be.equal(1);
            expect(nextButtonState, "'Next' Button is enabled").to.be.false;
            expect(previousButtonState, "'Previous' Button is enabled").to.be.false;
        });

    });
});