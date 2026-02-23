const BasePage = require("./BasePage.js");
const ElementsPage = require('./ElementsPage.js');
const FormsPage = require('./FormsPage.js');
const AlertsFrameWindowsPage = require('./AlertsFrameWindowsPage.js');
const WidgetsPage = require('./WidgetsPage.js');
const InteractionsPage = require('./InteractionsPage.js');
const BooksPage = require("./book_store/BooksPage.js");
const { waitVisible }= require("../utils/WaitUtils.js");

class HomePage extends BasePage 
{
  constructor(driver) {
    super(driver);
    this.cardPrefix= "//div[@id='root']//a[@href='/";
    //this.cardNames=['Elements', 'Forms', 'Alerts, Frame & Windows', 'Widgets', 'Interactions', 'Book Store Application'];
    this.cardLinks=['elements', 'forms', 'alertsWindows', 'widgets', 'interaction', 'books'];
    this.booksCardName= { xpath: "//div[@id='root']//h5[text()='Book Store Application']"};
  }

  _getCardLink(cardLink){
    return { xpath: `${this.cardPrefix}${cardLink}']`};

  }
  async waitCardsVisible(){
    await waitVisible(this.driver, this.booksCardName);
  }
  async gotoElements() {
    const elementsCard=this._getCardLink(this.cardLinks[0]);
    await this._click(elementsCard);
    return new ElementsPage(this.driver);
  }
  async gotoForms() {
    const formsCard= this._getCardLink(this.cardLinks[1]);
    await this._click(formsCard);
    return new FormsPage(this.driver);
  }
  async gotoAlertsFrameWindows() {
    const alertsFrameWindowsCard= this._getCardLink(this.cardLinks[2]);
    await this._click(alertsFrameWindowsCard);
    return new AlertsFrameWindowsPage(this.driver);
  }
  async gotoWidgets() {
    const widgetsCard= this._getCardLink(this.cardLinks[3]);
    await this._click(widgetsCard);
    return new WidgetsPage(this.driver);
  }
  async gotoInteractions() {
    const interactionsCard= this._getCardLink(this.cardLinks[4]);
    await this._click(interactionsCard);
    return new InteractionsPage(this.driver);
  }
  async gotoBookStoreApplication() {
    const bookStoreApplicationCard= this._getCardLink(this.cardLinks[5]);
    await this._click(bookStoreApplicationCard);
    return new BooksPage(this.driver);
  }
}
module.exports = HomePage;