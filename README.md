# Selenium_JS
First automation testing project with Selenium WebDriver/JS.

## Project Overview
Automated tests for a sample web application using Selenium WebDriver with JavaScript.  
Includes page object model, utility functions, and test scripts.

## Prerequisites / Environment
- Node.js v22.20.0
- npm v10.9.3
- Windows 10 Pro
- Chrome v141 (tested)

## Project Setup
1. Clone the repo:
```git clone https://github.com/OlgaFilili/Selenium_JS ```

2. Navigate to project folder:
```cd Selenium_JS ```

3. Install dependencies:
```npm install ```

4. Project Structure
Selenium_JS/
├─ node_modules/          # Installed dependencies (ignored by Git)
├─ tests/                 # Test scripts
│   ├─ BaseTest.js        # Common test setup/teardown
│   ├─ elements/
│   │   └─ RadioButtonTest.js
│   └─ (other test files)
├─ pages/                 # Page Object Model classes
│   ├─ BasePage.js
│   ├─ HomePage.js
│   ├─ ElementsPage.js
│   ├─ elements/
│   │   └─ RadioButtonPage.js
│   └─ (other page objects)
├─ utils/                 # Utility/helper functions
│   ├─ driver.js
│   └─ (other utilities)
├─ package.json           # Node.js dependencies and scripts
├─ package-lock.json      # Locked dependency versions
└─ README.md              # Project documentation

5. Running Tests
```npx mocha tests/ ```

## Project Status
Fully functional with working Mocha tests.
Page Object Model implemented (pages/ and utils/ folders).
Test examples: RadioButtonTest.js in tests/elements/.
Core reusable components: BaseTest.js, BasePage.js.

## Notes
ChromeDriver is managed by the chromedriver package.
Tests are designed using Mocha + Chai + Selenium WebDriver.
Test failures caused by page elements (ads, modals) should be handled in Page Objects.
Use async/await in tests for proper promise handling.

