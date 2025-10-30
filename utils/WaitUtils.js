const { until } = require('selenium-webdriver');

async function waitVisible(driver, locator) {
    const timeout= 5000;
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(element), timeout);
    return element;
}

async function waitClickable(driver, locator) {
    const timeout= 5000;
    const element = await waitVisible(driver, locator);
    await driver.wait(until.elementIsEnabled(element), timeout);
    return element;
}

async function waitText(driver, locator, expectedText) {
    const timeout= 5000;
    await driver.wait(async () => {
        const element = await driver.findElement(locator);
        const text = await element.getText();
        return text.includes(expectedText);
    }, timeout, `Text "${expectedText}" not found in element`);
}
module.exports={ waitClickable, waitVisible};