const BasePage = require("../BasePage.js");
const MainMenu = require("../../components/MainMenu.js");
const { waitVisible } = require("../../utils/WaitUtils.js");

class AutomationPracticeFormPage extends BasePage
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
        this.mainHeader= { xpath: "//div//h1"};
        this.subHeader= { xpath:  "//div//h5"};
    }
    async waitMainHeader(){
        await waitVisible(this.driver, this.mainHeader);
    }
    async getMainHeader(){
        return await this._getText(this.mainHeader);
    }
    async getSubHeader(){
        return await this._getText(this.subHeader);
    }
}
module.exports= AutomationPracticeFormPage;