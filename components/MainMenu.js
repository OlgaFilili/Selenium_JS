class MainMenu
{
  constructor(driver) {
    this.driver= driver;
    this.ElementsCard= { xpath: "//div[text()='Elements']"};
    this.FormsCard= { xpath: "//div[text()='Forms']"};
    this.AlertsFrameWindowsCard= { xpath: "//div[text()='Alerts, Frame & Windows']"};
    this.WidgetsCard= { xpath: "//div[text()='Widgets']"};
    this.InteractionsCard= { xpath: "//div[text()='Interactions']"};
    this.BookStoreApplicationCard= { xpath: "//div[text()='Book Store Application']"};
    //Elements` Menu Items
    this.CheckBoxMenuItem= { xpath: "//li[@id='item-1']//span[text()='Check Box']"};
    this.RadioButtonMenuItem= { xpath: "//li[@id='item-2']//span[text()='Radio Button']"};
    this.WebTablesMenuItem= { xpath: "//li[@id='item-3']//span[text()='Web Tables']"};
  }
 
  async clickElements() {
    await this.driver.findElement(this.ElementsCard).click();
  }
  async clickRadioButtonMenuItem() {
    await this.driver.findElement(this.RadioButtonMenuItem).click();
  }
  async clickCheckBoxMenuItem() {
    await this.driver.findElement(this.CheckBoxMenuItem).click();
  }
  async clickWebTablesMenuItem() {
    await this.driver.findElement(this.WebTablesMenuItem).click();
  }

  async clickForms() {
    await this.driver.findElement(this.FormsCard).click();
  }

  async clickAlertsFrameWindows() {
    await this.driver.findElement(this.AlertsFrameWindowsCard).click();
  }

  async clickWidgets() {
    await this.driver.findElement(this.WidgetsCard).click();
  }

  async clickInteractions() {
    await this.driver.findElement(this.InteractionsCard).click();
  }

  async clickBookStoreApplication() {
    await this.driver.findElement(this.BookStoreApplicationCard).click();
  }

}

module.exports = MainMenu;