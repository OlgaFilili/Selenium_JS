const BasePage = require("../pages/BasePage.js");
const { waitVisible, waitClickable, waitIsRemoved } = require("../utils/WaitUtils.js");
const { scrollToElement } = require("../utils/BrowserUtils.js");

class BooksTable extends BasePage
{
    constructor(driver){
        super(driver);
        this.tableColumns= { xpath: "//div[contains(@class,'header-content')]"};
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

}
module.exports= BooksTable;