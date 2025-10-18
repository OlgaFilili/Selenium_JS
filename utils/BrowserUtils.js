async function scrollToElement(driver, element) {
  await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
}

async function clickElement(driver, element){
  await driver.executeScript("arguments[0].click();", element); // fallback
}

async function getDirectText(driver, locator) {
    const element = await driver.findElement(locator);
    return driver.executeScript('return arguments[0].childNodes[0].nodeValue;', element);
}
module.exports = { scrollToElement, getDirectText };