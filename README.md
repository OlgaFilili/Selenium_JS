# Selenium_JS
First automation testing project with Selenium WebDriver/JS.

## Project Overview
Automated tests for a sample web application using Selenium WebDriver with JavaScript.  
Includes page object model, components, utility functions, and test scripts.
The project also includes API testing documentation for the DemoQA Book Store application.

## Prerequisites / Environment
- Node.js v22.20.0
- npm v10.9.3
- Windows 10 Pro
- Chrome v142 (tested)

## Project Setup
1. Clone the repo:
```git clone https://github.com/OlgaFilili/Selenium_JS ```

2. Navigate to project folder:
```cd Selenium_JS ```

3. Install dependencies:
```npm install ```

4. Project Structure
Selenium_JS/
├─ components/                  # Reusable elements
│   ├─ MainMenu.js
│   └─ (other components)
├─ docs/api/  
│   ├── test-cases/             # API test cases (smoke, regression)
│   ├── bugs/                   # Bug reports linked to test cases
│   └── README.md               # API testing overview
├─ node_modules/                # Installed dependencies (ignored by Git)
├─ pages/                       # Page Object Model classes
│   ├─ alerts/
│   │   └─BrowserWindowsPage.js
│   ├─ book_store/
│   │   ├─ BooksPage.js
│   │   ├─ LoginPage.js
│   │   ├─ ProfilePage.js
│   │   └─ SwaggerPage.js
│   ├─ elements/
│   │   ├─ CheckBoxPage.js
│   │   ├─ RadioButtonPage.js
│   │   └─ RWebTablesPage.js
│   ├─ forms/
│   │   └─AutomationPracticeFormPage.js
│   ├─ interactions/
│   │   ├─ DroppablePage.js
│   │   └─ SortablePage.js
│   ├─ widgets/
│   │   └─DatePickerPage.js
│   ├─ AlertsFrameWindowsPage.js
│   ├─ BasePage.js
│   ├─ ElementsPage.js
│   ├─ FormsPage.js
│   ├─ HomePage.js
│   ├─ InteractionsPage.js
│   ├─ WidgetsPage.js
│   └─ (other page objects)
├─ tests/                       # Test scripts
│   ├─ elements/
│   │   ├─ CheckBoxTest.js
│   │   ├─ RadioButtonTest.js
│   │   └─ WebTablesTest.js
│   ├─ BaseTest.js              # Common test setup/teardown
│   ├─ MainMenuResponsiveTest.js  
│   ├─ MainMenuTest.js   
│   └─ (other test files)
├─ utils/                       # Utility/helper functions
│   ├─ BrowserUtils.js
│   ├─ DriverUtils.js
│   ├─ PageFactoryUtils.js
│   ├─ ScreenshotUtils.js
│   ├─ StringUtils.js
│   ├─ WaitUtils.js
│   └─ (other utilities)
├─ package.json                 # Node.js dependencies and scripts
├─ package-lock.json            # Locked dependency versions
└─ README.md                    # Project documentation

5. Running Tests
```npx mocha tests/ ```

## Project Status
Fully functional with working Mocha tests.
Page Object Model implemented (pages/, components/ and utils/ folders).
Test examples: CheckBoxTest.js in tests/elements,
               RadioButtonTest.js in tests/elements/,
               WebTablesTest.js in tests/elements/,
               MainMenuTest.js and MainMenuTestResponsive.js in tests/.
Core reusable components: BaseTest.js, BasePage.js.

## API Testing
Covered areas:
- Authorization endpoint testing
- Smoke and regression test cases
- Negative and boundary scenarios
- Basic security observations

Test cases and bug reports can be found in:
- `docs/api/`
This part of the project demonstrates API testing approach, test design, and bug reporting skills.

## Notes
ChromeDriver is managed by the chromedriver package.
Tests are designed using Mocha + Chai + Selenium WebDriver.
Completed RadioButtonTest suite.
Completed CheckBoxTest suite.
Completed WebTablesTest suite.
Completed MainMenuTest suite for navigation panel and MainMenuResponsiveTest suite.
Use async/await in tests for proper promise handling.
Add screenshot functionality for failing tests.

