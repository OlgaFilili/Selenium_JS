const { Builder } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

let driver; // will be created once

async function createDriver() {
  if (!driver) {
    const options = new chrome.Options();
    const service= new chrome.ServiceBuilder(chromedriver.path);
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeService(service)
      .setChromeOptions(options)
      .build();
  }
  // Ensure the promise resolves before continuing
  //await driver.getSession();
  return driver;
}

async function quitDriver() {
  if (driver) {
    await driver.quit();
    driver = null;
  }
}

module.exports = { createDriver, quitDriver };
