const HomePage = require('../pages/HomePage');
const { createDriver, quitDriver }= require('../utils/DriverUtils');
let driver;
let url = 'https://demoqa.com/';
let homePage;

before(async function() {
    // runs once before all tests
    driver= await createDriver();
    await driver.manage().window().maximize();
});

beforeEach(async function() {
    // runs before each test
    await driver.get(url);
    homePage =new HomePage(driver);
    
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

module.exports = {
  getHomePage,
  driver
};

