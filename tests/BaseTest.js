const HomePage = require('../pages/HomePage');
const { createDriver, quitDriver }= require('../utils/driver');
let driver;
let url = 'https://demoqa.com/';
let homePage;

before(async function() {
    // runs once before all tests
    this.timeout(5000);
    console.log(">>> before() starting driver...");
    driver= await createDriver();
    console.log(">>> driver created!");
    await driver.manage().window().maximize();
    console.log(">>> window maximized!");
});

beforeEach(async function() {
    // runs before each test
    await driver.get(url);
    homePage =new HomePage(driver);
});

after(async function() {
    // runs once after all tests
    await quitDriver();
});

/**
 * @returns {import('../pages/HomePage')}
 */
function getHomePage() {
  return homePage;
}

module.exports = {
  getHomePage,
  driver
};

