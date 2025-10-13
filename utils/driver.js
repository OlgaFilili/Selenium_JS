const { Builder } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');

let driver; // will be created once

async function createDriver() {
  if (!driver) {
    const options = new chrome.Options();
    console.log('>>> createDriver() started');
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    console.log('>>> createDriver() finished');
  }

  // Ensure the promise resolves before continuing
  await driver.getSession();
  return driver;
}

async function quitDriver() {
  if (driver) {
    await driver.quit();
    driver = null;
  }
}

module.exports = { createDriver, quitDriver };
