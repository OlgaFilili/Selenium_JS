const HomePage = require("../pages/HomePage.js");
const { createDriver, quitDriver }= require("../utils/DriverUtils.js");
const { saveScreenshot } = require('../utils/ScreenshotUtils.js');

let driver;
let url = 'https://demoqa.com/';
let homePage;

before(async function() {
    // runs once before all tests
    driver= await createDriver();
    await driver.manage().window().maximize();
    this.driver=driver;
});

beforeEach(async function() {
    // runs before each test
    await driver.get(url);
    homePage =new HomePage(driver);
    this.homePage=homePage;
});

afterEach(async function () {
    if (this.currentTest.state === 'failed') {
        await saveScreenshot(driver, this);
    }
});

after(async function() {
    // runs once after all tests
    //await new Promise(r => setTimeout(r, 3000));
    await quitDriver();
});

/**
 * @returns {import('../pages/HomePage')}
 */
function getHomePage() {
  return homePage;
}
module.exports = { getHomePage };