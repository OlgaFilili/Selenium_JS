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
├─ pages/                 # Page Object Model classes
│   ├─ elements/
│   │   ├─ CheckBoxPage.js
│   │   ├─ RadioButtonPage.js
│   │   └─ RWebTablesPage.js
│   ├─ BasePage.js
│   ├─ ElementsPage.js
│   ├─ HomePage.js
│   └─ (other page objects)
├─ tests/                 # Test scripts
│   ├─ elements/
│   │   ├─ CheckBoxTest.js
│   │   ├─ RadioButtonTest.js
│   │   └─ WebTablesTest.js
│   ├─ BaseTest.js        # Common test setup/teardown
│   └─ (other test files)
├─ utils/                 # Utility/helper functions
│   ├─ BrowserUtils.js
│   ├─ DriverUtils.js
│   ├─ StringUtils.js
│   ├─ WaitUtils.js
│   └─ (other utilities)
├─ package.json           # Node.js dependencies and scripts
├─ package-lock.json      # Locked dependency versions
└─ README.md              # Project documentation

5. Running Tests
```npx mocha tests/ ```

## Project Status
Fully functional with working Mocha tests.
Page Object Model implemented (pages/ and utils/ folders).
Test examples: CheckBoxTest.js in tests/elements,
               RadioButtonTest.js in tests/elements/,
               WebTablesTest.js in tests/elements/.
Core reusable components: BaseTest.js, BasePage.js.

## Notes
ChromeDriver is managed by the chromedriver package.
Tests are designed using Mocha + Chai + Selenium WebDriver.
Completed RadioButtonTest suite.
Completed CheckBoxTest suite.
Completed WebTablesTest suite.
Use async/await in tests for proper promise handling.

