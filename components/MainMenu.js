const { waitVisible } = require("../utils/WaitUtils");

class MainMenu
{
  constructor(driver) {
    this.driver= driver;
    this.navigationBarButton= {xpath: "//button[@class='navbar-toggler']"};
    this.expandedMenuLocator= { xpath: "//div[contains(@class,'left-pannel')]"};
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
  async _ensureMenuVisible() {
    const expandedPanels = await this.driver.findElements(this.expandedMenuLocator);
    if (expandedPanels.length > 0) {
        return;
    }
    const button = await this.driver.findElement(this.navigationBarButton);
    await button.click();
    await waitVisible(this.driver, this.expandedMenuLocator);
  }
  async expandMenu(name) {
    await this._ensureMenuVisible();
    const header = this._getMenuHeaderLocator(name);
    const container = this._getMenuStatusLocator(name);
    const element = await this.driver.findElement(container);
    const classValue = await element.getAttribute("class");

    if (!classValue.includes("show")) {
        await this.driver.findElement(header).click();
    }
  }
  async collapseMenu(name) {
    await this._ensureMenuVisible();
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