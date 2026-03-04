const BasePage = require("../BasePage.js");
const MainMenu = require("../../components/MainMenu.js");
const { waitVisible, waitClickable } = require("../../utils/WaitUtils.js");
const { isInputValid, scrollRelatively, clickElement } = require("../../utils/BrowserUtils.js");

class WebTablesPage extends BasePage
{
    constructor(driver) {
        super(driver);
        this.menu=new MainMenu(driver);
        this.tableHeader= { xpath: "//h1[text()='Web Tables']"};
        this.addButton= { id: "addNewRecordButton"};
        this.searchBox= { id: "searchBox"};
        this.tableColumns= { xpath: "//tr//th"};
        this.tableElements= { xpath: "//tbody//tr"};
        this.cell= { xpath: ".//td"};
        this.editButton={ xpath: ".//span[@title='Edit']"};
        this.deleteButton={ xpath: ".//span[@title='Delete']"};
        this.regFormHeader= { id: "registration-form-modal"};
        this.regFormCloseButton= { xpath: "//button[@aria-label='Close']"};
        this.regFormPreffix="//form[@id='userForm']//input[@placeholder='";
        this.regFormSubmitButton= { id: "submit"};
        this.pageCurrentOfTotal= { xpath: "//div[text()='Page']//strong"};
        this.previousPageButton= { xpath: "//button[text()='Previous']"};
        this.nextPageButton= { xpath: "//button[text()='Next']"};
        this.firstPageButton= { xpath: "//button[text()='First']"};
        this.lastPageButton= { xpath: "//button[text()='Last']"};
        this.rowsPerPageSelect= { xpath: "//select"};
        this.rowsPerPageOptions="option";

    }

    _getRegFormFieldLocator(placeholder){
        return { xpath: `${this.regFormPreffix}${placeholder}']`};
    }
    _getRowsPerPageLocator(num){
        return { xpath: `${this.rowsPerPagePrefix}${num}']`}
    }
    async getTableHeader(){
        return await this._getText(this.tableHeader);
    }

    async getTableColumns(){
        const columns= await this._finds(this.tableColumns);
        const text= await Promise.all(columns.map(col => this._getText(col)));
        return text.join(' ');
    }

    async findEntry(email){
        const rows= await this._finds(this.tableElements);
        let text;
        for (const row of rows) {
            text = await this._getText(row);
            if (text.includes(email)) {
                return row;
            }
        }
        return null;
    }
    async getTotalNotNullEntriesNumber(){
        const rows= await this._finds(this.tableElements);
        return rows.length;
    }
    async getRowObject(rowElement) {
        const cells = await this._findsInside(rowElement, this.cell);
        return {
            FirstName: await this._getText(cells[0]),
            LastName: await this._getText(cells[1]),
            Age: await this._getText(cells[2]),
            Email: await this._getText(cells[3]),
            Salary: await this._getText(cells[4]),
            Department: await this._getText(cells[5]),
            EditButton: await this._findInside(cells[6], this.editButton),
            DeleteButton: await this._findInside(cells[6], this.deleteButton)
        };
    }
    async isEntryOnPage(data){
        const expected = data.replace(/\s+/g, ' ').trim();
        let entryData;
        const rows= await this._finds(this.tableElements);
        for (const row of rows){
            entryData=(await this._getText(row)).replace(/\s+/g, ' ').trim();
            if (entryData===expected) return true;
        }
        return false;
    }
    async clickAddButton(){
        await this._click(this.addButton);
    }
    async clickRegFormCloseButton(){
        await this._click(this.regFormCloseButton);
        await waitVisible(this.driver, this.previousPageButton);
    }
    async clickSubmitButton(){
        await this._click(this.regFormSubmitButton);
    }
    // Native Selenium click is unreliable here due to footer overlapping
    // pagination controls inside a scrollable container.
    // JS click is used intentionally for stability.
    // Same issue for interaction with the amount of entries per page show-select dropdown.
    async clickPreviousPageButton(){
        const element=await waitClickable(this.driver, this.previousPageButton);
        await scrollRelatively(this.driver, 0, 200);
        await clickElement(this.driver, element);
    }
    async clickNextPageButton(){
        const element=await waitClickable(this.driver, this.nextPageButton);
        await scrollRelatively(this.driver, 0, 200);
        await clickElement(this.driver, element);
    }
    async clickLastPageButton(){
        const element=await waitClickable(this.driver, this.lastPageButton);
        await scrollRelatively(this.driver, 0, 200);
        await clickElement(this.driver, element);
    }
    async clickFirstPageButton(){
        const element=await waitClickable(this.driver, this.firstPageButton);
        await scrollRelatively(this.driver, 0, 200);
        await clickElement(this.driver, element);
    }
    async deleteEntry(email){
        const row= await this.findEntry(email);
        const cells= await this.getRowObject(row);
        await this._clickElement(cells.DeleteButton);
    }
    async setValueInRegForm(placeholder, value){
        const locator=await this._getRegFormFieldLocator(placeholder);
        await this._set(locator, value);
    }
    async editEntry(email, placeholder, value){
        const row= await this.findEntry(email);
        const cells= await this.getRowObject(row);
        await this._clickElement(cells.EditButton);
        await this.setValueInRegForm(placeholder, value);
        await this.clickSubmitButton();
    }
    async addNewEntry(fields, ...data){
        for (let j=0; j<data.length; j++){
            await this.clickAddButton();
            for (let i=0; i<fields.length; i++){
                await this.setValueInRegForm(fields[i], data[j][i]);
            }
            await this.clickSubmitButton();
        }
    }
    async waitPreviousButton(){
        await waitVisible(this.driver, this.previousPageButton);
    }
    async rowsPerPage(){
        const select=await this._find(this.rowsPerPageSelect);
        const value= await this._getValue(select);
        return Number(value);
    }
    async rowsPerPageText() {
        const select = await this._find(this.rowsPerPageSelect);
        const selectedOption = await this._findInside(select, { css: `${this.rowsPerPageOptions}:checked`});
        return (await this._getText(selectedOption)).replace(/\s+/g, ' ').trim();;
    }
    async listRowsPerPage(){
        const select= await this._find(this.rowsPerPageSelect);
        const options= await this._findsInside(select, { css: `${this.rowsPerPageOptions}`});
        let list=[]; 
        let value;
        for (let i=0; i<options.length; i++){
            value= await this._getValue(options[i]);
            list[i]=Number(value);
        }
        return list;
    }
    async listRowsPerPageText(){
        const select=await this._find(this.rowsPerPageSelect);
        const options= await this._findsInside(select, { css: `${this.rowsPerPageOptions}`});
        let list=[]; 
        let value;
        for (let i=0; i<options.length; i++){
            value= (await this._getText(options[i])).replace(/\s+/g, ' ').trim();
            list[i]=value;
        }
        return list;
    }
    async setRowsPerPage(value) {
        const select = await this._find(this.rowsPerPageSelect);
        await this._clickElement(select);
        const option = await select.findElement({ css: `${this.rowsPerPageOptions}[value="${value}"]`});
        await option.click();
    }
    async closeRowsPerPageDropdown(){
        const select = await this._find(this.rowsPerPageSelect);
        await clickElement(this.driver, select);
        await this._pressEscape();
        await scrollRelatively(this.driver, 0, -190);
    }
    async isPreviousButtonEnabled(){
        return await this._isEnabled(this.previousPageButton);
    }
    async isNextButtonEnabled(){
        return await this._isEnabled(this.nextPageButton);
    }
    async isFirstButtonEnabled(){
        return await this._isEnabled(this.firstPageButton);
    }
    async isLastButtonEnabled(){
        return await this._isEnabled(this.lastPageButton);
    }
    async isRegFormStillOpen(){
        return await this._isDisplayed(this.regFormHeader);
    }
    async _parsePagesInfo(){
        const info=await this._find(this.pageCurrentOfTotal);
        const text= (await this._getText(info)).trim().replace(/\s+/g, ' ');
        const [current, total]= text.split(' of ').map(Number);
        return {current, total};
    }
    async getTotalPages(){
        const {total}= await this._parsePagesInfo();
        return total;
    }
    async getCurrentPageNumber(){
        const {current}= await this._parsePagesInfo();
        return current;
    }
    async getInputValidity(placeholder){
        const locator= await this._getRegFormFieldLocator(placeholder);
        const element= await this._find(locator);
        const isValid= await isInputValid(this.driver, element);
        return isValid;
    }
    async getSearchFieldValue() {
        const element= await this._find(this.searchBox);
        return await this._getValue(element);
    }
    async searchEntries(text){
        await this._set(this.searchBox, text);
        const actual = await this.getSearchFieldValue();
        if (actual !== text) throw new Error(`SearchBox value mismatch: expected "${text}", got "${actual}"`);

    }
    async deleteCharsFromTextSearch(num = 1){
        await this._backspace(this.searchBox, num);
    }

    async waitForTableUpdate(previousCount, timeout = 5000) {
        await this.driver.wait(async () => {
            const currentCount = await this.getTotalNotNullEntriesNumber();
            return currentCount !== previousCount;
        }, timeout, 'Table did not update after search change');
    }
}
module.exports= WebTablesPage;