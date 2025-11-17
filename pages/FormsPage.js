const MainMenu = require("../components/MainMenu");
const BasePage = require("./BasePage");

class FormsPage extends BasePage 
{
    constructor(driver) {
    super(driver);
    this.menu= new MainMenu(driver);
    this.infoText= { xpath: "//div[text()='Please select an item from left to start practice.']"};
    }
}

module.exports = FormsPage;