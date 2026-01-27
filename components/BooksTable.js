const BasePage = require("../pages/BasePage.js");
const { waitVisible, waitClickable, waitIsRemoved, waitForFirstVisible } = require("../utils/WaitUtils.js");
const { scrollToElement } = require("../utils/BrowserUtils.js");

class BooksTable extends BasePage
{
    constructor(driver){
        super(driver);
        this.searchBox= { id: "searchBox"};
        this.tableColumns= { xpath: "//div[contains(@class,'header-content')]"};
        this.tableElements= { xpath: "//div[@class='rt-tr-group']"};
        this.cell= { xpath: ".//div[@role='gridcell'][2]"};
        this.entryOnPage= { xpath: "//div[@class='rt-tbody']//div[@role='row']"};
        this.rowImage= { xpath: ".//img"};
        this.notNullEntry= { xpath: "//div[@class='rt-table']//img[@src]"}; 
        this.noDataText= { xpath: "//div[@class='rt-noData']"};
        this.rowsPerPageSelect= { xpath: "//select"};
        this.rowsPerPageOptions="option";
        this.previousPageButton= { xpath: "//button[text()='Previous']"};
        this.nextPageButton= { xpath: "//button[text()='Next']"};

    }

    async getTableColumns(){
        const columns= await this._finds(this.tableColumns);
        const text= await Promise.all(columns.map(col => this._getText(col)));
        return text.join(' ');
    }
    async rowsPerPage(){
        const select=await this._find(this.rowsPerPageSelect);
        const value= await this._getValue(select);
        return Number(value);
    }
    async rowsPerPageText() {
        const select = await this._find(this.rowsPerPageSelect);
        const selectedOption = await this._findInside(select, { css: `${this.rowsPerPageOptions}:checked`});
        return await this._getText(selectedOption);
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
            value= await this._getText(options[i]);
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
        await this._clickElement(select);
        await this._pressEscape();
        await scrollRelatively(this.driver, 0, -190);
    }
    async isPreviousButtonEnabled(){
        return await this._isEnabled(this.previousPageButton);
    }
    async isNextButtonEnabled(){
        return await this._isEnabled(this.nextPageButton);
    }
    async searchEntries(text){
        await this._set(this.searchBox, text);
    }
    async waitSearchResult(){
        return await waitForFirstVisible(this.driver, this.notNullEntry, this.noDataText);
    }
    async isEntryOnPage({ title, auth, pub }) {
        let entryData;
        const rows = await this._finds(this.entryOnPage);
        for (const row of rows) {
            entryData= (await this._getText(row)).replace(/\s+/g, ' ').trim();
            const matches = entryData.includes(title) && entryData.includes(auth) && entryData.includes(pub);
            if (matches) 
                return true;
        }
        return false;
    }
    async getImageSrc({ title, auth }){
        let entryData;
        const rows = await this._finds(this.entryOnPage);
        for (const row of rows) {
            entryData= (await this._getText(row)).replace(/\s+/g, ' ').trim();   
            const matches = entryData.includes(title) && entryData.includes(auth);
            if (matches) {
                const img= await this._findInside(row, this.rowImage);
                return await this._getSrc(img);
            }
        }
        return null;
    }
    async getTotalNotNullEntriesNumber(){
        const rows= await this._finds(this.tableElements);
        let firstCell, firstText;
        let number=0;
        for (const row of rows) {
            firstCell = await this._findInside(row, this.cell);
            firstText = (await this._getText(firstCell)).trim();
            if (firstText){
                number++;
            }
            else break;
        }
        return number;
    }
    async deleteCharsFromTextSearch(num = 1){
        await this._backspace(this.searchBox, num);
    }
    async getSearchFieldValue() {
        const element= await this._find(this.searchBox);
        return await this._getValue(element);
    }
    async waitForTableUpdate(previousCount, timeout = 2000) {
        await this.driver.wait(async () => {
            const currentCount = await this.getTotalNotNullEntriesNumber();
            return currentCount !== previousCount;
        }, timeout, 'Table did not update after search change');
    }
    async clickPreviousPageButton(){
        await this._click(this.previousPageButton);
    }
    async clickNextPageButton(){
        await this._click(this.nextPageButton);
    }
}
module.exports= BooksTable;