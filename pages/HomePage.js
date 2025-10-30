const BasePage = require("./BasePage");
const ElementsPage = require('./ElementsPage.js');
const FormsPage = require('./FormsPage.js');
const AlertsFrameWindowsPage = require('./AlertsFrameWindowsPage');
const WidgetsPage = require('./WidgetsPage');
const InteractionsPage = require('./InteractionsPage');
const BookStoreApplicationPage = require('./BookStoreApplicationPage');

class HomePage extends BasePage 
{
  constructor(driver) {
    super(driver);
    this.ElementsCard= { xpath: "//div[@id='app']//h5[text()='Elements']"};
    this.FormsCard= { xpath: "//div[@id='app']//h5[text()='Forms']"};
    this.AlertsFrameWindowsCard= { xpath: "//div[@id='app']//h5[text()='Alerts, Frame & Windows']"};
    this.WidgetsCard= { xpath: "//div[@id='app']//h5[text()='Widgets']"};
    this.InteractionsCard= { xpath: "//div[@id='app']//h5[text()='Interactions']"};
    this.BookStoreApplicationCard= { xpath: "//div[@id='app']//h5[text()='Book Store Application']"};
  }
 
  async gotoElements() {
    await this._click(this.ElementsCard);
    return new ElementsPage(this.driver);
  }

  async gotoForms() {
    await this._click(this.FormsCard);
    return new FormsPage(this.driver);
  }

  async gotoAlertsFrameWindows() {
    await this._click(this.AlertsFrameWindowsCard);
    return new AlertsFrameWindowsPage(this.driver);
  }

  async gotoWidgets() {
    await this._click(this.WidgetsCard);
    return new WidgetsPage(this.driver);
  }

  async gotoInteractions() {
    await this._click(this.InteractionsCard);
    return new InteractionsPage(this.driver);
  }

  async gotoBookStoreApplication() {
    await this._click(this.BookStoreApplicationCard);
    return new BookStoreApplicationPage(this.driver);
  }

}

module.exports = HomePage;