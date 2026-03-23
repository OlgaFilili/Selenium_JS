const BasePage = require("../pages/BasePage.js");
const { waitVisible, waitClickable, waitIsRemoved, waitForFirstVisible } = require("../utils/WaitUtils.js");
const { scrollRelatively, scrollToElement } = require("../utils/BrowserUtils.js");

class BooksTable extends BasePage
{
    constructor(driver){
        super(driver);
        this.searchBox= { id: "searchBox"};
        this.tableColumns= { xpath: "//tr//th"};
        this.entryOnPage= { xpath: "//tbody//tr"};
        this.cell= { xpath: ".//td"};
        this.rowImage= { xpath: ".//img"};
        this.pageCurrentOfTotal= { xpath: "//button[text()='Previous']/following-sibling::span"};
        this.previousPageButton= { xpath: "//button[text()='Previous']"};
        this.nextPageButton= { xpath: "//button[text()='Next']"};

    }
    async getTableColumns(){
        const columns= await this._finds(this.tableColumns);
        const text= await Promise.all(columns.map(col => this._getText(col)));
        return text.join(' ');
    }
    async findBook(title){
        const rows= await this._finds(this.entryOnPage);
        let text;
        for (const row of rows) {
            text = await this._getText(row);
            if (text.includes(title)) {
                return row;
            }
        }
        return null;
    }
    async gotoLink(rowElement) {
        const cells = await this._findsInside(rowElement, this.cell);
        const link= await this._findInside(cells[1], { xpath: ".//a"});
        await this._clickElement(link);
    }
    async gotoBook(title){
        const row= await this.findBook(title);
        await this.gotoLink(row);
    }
    async getBookUrl() {
        return await this._getUrl();
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
    async scrollToTheHead(){
        const el= await this._find(this.searchBox);
        await scrollToElement(this.driver, el);
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
    async waitSearchBox(){
        await waitVisible(this.driver, this.searchBox);
    }
    async waitForTableUpdate(previousCount, timeout = 5000) {
        await this.driver.wait(async () => {
            const currentCount = await this.getTotalNotNullEntriesNumber();
            return currentCount !== previousCount;
        }, timeout, 'Table did not update after search change');
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
        const rows= await this._finds(this.entryOnPage);
        return rows.length;
    }
    async deleteCharsFromTextSearch(num = 1){
        await this._backspace(this.searchBox, num);
    }
    async getSearchFieldValue() {
        const element= await this._find(this.searchBox);
        return await this._getValue(element);
    }
    async clickPreviousPageButton(){
        await this._click(this.previousPageButton);
    }
    async clickNextPageButton(){
        await this._click(this.nextPageButton);
    }
    async getDisplayedBooks(){
        const rows = await this._finds(this.entryOnPage);
        const books = [];

        for (const row of rows) {
            const entryData = (await this._getText(row)).replace(/\s+/g, ' ').trim();
            if (entryData) {
                books.push(entryData);
            }
        }

        return books;
    }
}
module.exports= BooksTable;