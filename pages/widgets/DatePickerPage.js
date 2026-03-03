const BasePage = require("../BasePage.js");
const MainMenu = require("../../components/MainMenu.js");
const { waitVisible } = require("../../utils/WaitUtils.js");

class DatePickerPage extends BasePage
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
        this.mainHeader= { xpath: "//div//h1"};
        this.datePicker= { id: "datePickerMonthYear"};
        this.dateAndTimePicker= { id: "dateAndTimePicker"};
    }
    async waitMainHeader(){
        await waitVisible(this.driver, this.mainHeader);
    }
    async getMainHeader(){
        return await this._getText(this.mainHeader);
    }
    async pickOnlyDate(){
        await this._click(this.datePicker);
    }
    async pickDateAndTime(){
        await this._click(this.dateAndTimePicker);
    }
}
module.exports= DatePickerPage;