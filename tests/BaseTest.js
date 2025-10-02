const BasePage = require('../pages/BasePage');
const HomePage = require('../pages/HomePage');
const driver= require('../utils/driver');
let basePage;
let homePage;

before(async function() {
    // runs once before all tests
    basePage = new BasePage();
    await driver.manage().window().maximize();
});

beforeEach(async function() {
    // runs before each test
    homePage = new HomePage();
    await homePage.open();
});

after(async function() {
    // runs once after all tests
    await driver.quit();
});

module.exports = {
  getBasePage: () => basePage,
  getHomePage: () => homePage,
  driver
};
