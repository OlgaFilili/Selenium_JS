class MainMenu
{
  constructor(driver) {
    this.driver= driver;
    this.navigationBarButton= {xpath: "//button[@class='navbar-toggler']"};
    this.cardMenuPrefix= "//div[contains(@class,'header-text') and text()='";
    this.cardMenuSuffix= "//ancestor::div[contains(@class,'element-group')]//div[contains(@class,'element-list')]";
    //Menu Items
    this.menuItemPrefix="//li//span[text()='";
  }

  // possible names={'Elements', 'Forms', 'Alerts, Frame & Windows', 'Widgets', 'Interactions', 'Book Store Application'}
  _getMenuHeaderLocator(name) {
    return {xpath: `${this.cardMenuPrefix}${name}']`};
  }
  _getMenuStatusLocator(name) {
    return {xpath: `${this.cardMenuPrefix}${name}']${this.cardMenuSuffix}`};
  }
  _getMenuItemLocator(name) {
    return { xpath: `${this.menuItemPrefix}${name}']`};
  }
  async expandMenu(name) {
    const header = this._getMenuHeaderLocator(name);
    const container = this._getMenuStatusLocator(name);
    const element = await this.driver.findElement(container);
    const classValue = await element.getAttribute("class");

    if (!classValue.includes("show")) {
        await this.driver.findElement(header).click();
    }
  }
  async collapseMenu(name) {
    const header = this._getMenuHeaderLocator(name);
    const container = this._getMenuStatusLocator(name);

    const element = await this.driver.findElement(container);
    const classValue = await element.getAttribute("class");

    if (classValue.includes("show")) {
        await this.driver.findElement(header).click();
    }
  }

  async clickMenuItem(menuName, itemName) {
    await this.expandMenu(menuName);
    const item = this._getMenuItemLocator(itemName);
    await this.driver.findElement(item).click();
  }

}

module.exports = MainMenu;