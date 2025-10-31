const BasePage = require("../BasePage");

class WebTablesPage extends BasePage
{
    constructor(driver) {
        super(driver);
        this.tableHeader= { xpath: "//h1[text()='Web Tables']"};
        this.addButton= { id: "addNewRecordButton"};
        this.searchBox= { id: "searchBox"};
        this.rowPrefix="//div[text()='";
        this.rowEditButtonSuffix="']//following::span[@title='Edit'][1]";
        this.rowDeleteButtonSuffix="']//following::span[@title='Delete'][1]";
        this.rowPersonalDataSuffix="']//preceding::div[";
        this.regFormPreffix="//form[@id='userForm']//input[@placeholder='";
        this.currentPage= { xpath: "//input[@aria-label='jump to page']"};
        this.totalPages= {xpath: "//span[text()='Page']//span"};
        this.previousPageButton= { xpath: "//button[text()='Previous']"};
        this.nextPageButton= { xpath: "//button[text()='Next']"};
        this.rowsPerPagePrefix= "//select//option[@value='";

        this.entryOnPagePrefix="(//div[@class='rt-tbody']//div[@role='row'])[";
    }

    _getRawEditButtonLocator(email){
        return { xpath: `${this.rowPrefix}${email}${this.rowEditButtonSuffix}`};
    }
    _getRawDeleteButtonLocator(email){
        return { xpath: `${this.rowPrefix}${email}${this.rowDeleteButtonSuffix}`};
    }
    /** @param {string} email
     *  @param {number} columnNum 
    */
    _getPersonalDataLocator(email, columnNum){
        return { xpath: `${this.rowPrefix}${email}${this.rowPersonalDataSuffix}${columnNum+1}]`};
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
    async deleteEntry(email){
        const locator= this._getRawDeleteButtonLocator(email);
        await this._click(locator);
    }
    /** @param {number} num */
    async getEntryOnPage(num){
        const locator= { xpath: `${this.entryOnPagePrefix}${num}]`};
        return await this._getText(locator);
    }
    async isEntryOnPage(num, data){
        let entryData;
        let is= false;
        for (let i = 1; i < num+1; i++) {
            entryData=(await this.getEntryOnPage(i)).replace(/\s+/g, ' ').trim();
            if (entryData===data) is=true;
        }
        return is;
    }
}
module.exports= WebTablesPage;