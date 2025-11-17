const MainMenu = require("../components/MainMenu");
const BasePage = require("./BasePage");

class BookStoreApplicationPage extends BasePage 
{
    constructor(driver) {
    super(driver);
    this.menu= new MainMenu(driver);
    }
}

module.exports = BookStoreApplicationPage;