async function scrollToElement(driver, element) {
  await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
}
async function scrollRelatively(driver, dx, dy){
  await driver.executeScript(`window.scrollBy(${dx}, ${dy});`);
}

async function clickElement(driver, element){
  await driver.executeScript("arguments[0].click();", element); // fallback
}

async function getDirectText(driver, locator) {
  const element = await driver.findElement(locator);
  return driver.executeScript("return arguments[0].childNodes[0].nodeValue;", element);
}

async function isInputValid(driver, element) {
  return driver.executeScript("return arguments[0].checkValidity();", element);
}
module.exports = { scrollToElement, getDirectText, isInputValid, scrollRelatively };