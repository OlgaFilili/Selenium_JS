const { getHomePage }= require("../BaseTest");
const WebTablesPage = require('../../pages/elements/WebTablesPage');
const { expect }= require('chai');

describe('Web Tables Page functionality check', function() {
    /*!!!!!!!!!!!Check the sequence of column headers on the page!!!!!!!!!!
    Tests are written for: First Name-> LastName-> Age ->Email-> Salary-> Department-> Action
    PersonalDataHeaders are placeholders for corresponding regFormFields
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    const personalDataHeaders=['Age', 'Last Name', 'First Name'];
    const regFormFieldsPlaseholders=['name@example.com', 'Salary', 'Department'];
    const rowsPerPage= [5, 10, 20, 25, 50, 100];

    /** @type {WebTablesPage} */
    let webTablesPage;
    beforeEach(async function(){
        const homePage= await getHomePage();
        const elementsPage= await homePage.gotoElements();
        webTablesPage= await elementsPage.gotoWebTablesMenuItem();
    });
    describe('smoke: Basic functionality check', function(){
        it('should confirm table header', async function() {
            const expectedHeader= "Web Tables";
            const actualHeader= await webTablesPage.getTableHeader();
            expect(actualHeader, "Actual and expected Header do not match").to.be.equal(expectedHeader);
        });
        it.only('should delete table entry', async function() {
            const email = 'kierra@example.com';
            const deleteEntryData = 'Kierra Gentry 29 kierra@example.com 2000 Legal';
            await webTablesPage.deleteEntry(email);
            const actualResult= await webTablesPage.isEntryOnPage(10, deleteEntryData);
            expect(actualResult, "Entry was not deleted").to.be.false;
        });
    });
});