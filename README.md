# Selenium_JS
An automation testing project using Selenium WebDriver with JavaScript.

## Project Overview
Automated UI tests for the DemoQA sample web application, implemented with Selenium WebDriver and JavaScript.
The project follows the Page Object Model and includes reusable components, utilities, and structured test suites.
API testing artifacts for the DemoQA Book Store authorization endpoints are also included.

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
├─ .github/
│   └─ workflows/
│       └─ ci.yml               # GitHub Actions workflow (PR-only, runs all tests)
├─ components/                  # Reusable elements
│   ├─ MainMenu.js
│   └─ (other components)
├─ docs/api/  
│   ├── bugs/                   # Bug reports linked to test cases
│   ├── test-cases/             # API test cases (smoke, regression)
│   └── README.md               # API testing overview
├─ node_modules/                # Installed dependencies (ignored by Git)
├─ pages/                       # Page Object Model classes
│   ├─ alerts/
│   │   └─BrowserWindowsPage.js
│   ├─ book_store/
│   │   ├─ AuthenticatedPage.js
│   │   ├─ BooksPage.js
│   │   ├─ LoginPage.js
│   │   ├─ ProfilePage.js
│   │   └─ SwaggerPage.js
│   ├─ elements/
│   │   ├─ CheckBoxPage.js
│   │   ├─ RadioButtonPage.js
│   │   └─ WebTablesPage.js
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
│   └─ (other page objects)
├─ tests/                       # Test scripts
│   ├─ book_store/
│   │   ├─ flows   
│   │   │   ├─ AuthSessionTest.js
│   │   │   ├─ LoginNegativeTest.js
│   │   │   └─ LoginSuccessTest.js
│   │   └─ ui
│   │       └─ LoginUITest.js
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
Run all tests locally:
```npx mocha tests/```
Locally: tests run with a visible Chrome browser (headed mode).
In CI (GitHub Actions): tests run automatically in headless Chrome.

## Project Status
Fully functional with working Mocha tests.
Page Object Model implemented (pages/, components/ and utils/ folders).
Shared abstractions are used for common behavior, including an AuthenticatedPage base class for authorized user state.
Test coverage includes:
- UI component validation (Elements)
- Navigation and layout checks
- Book Store authentication flows (UI, functional, session-level behavior)

Core reusable components: BaseTest.js, BasePage.js.

## API Testing
Covered areas:
- Authorization endpoint testing
  - Smoke and regression test cases
  - Negative and boundary scenarios
  - Basic security observations

Test cases and bug reports can be found in:
- `docs/api/`
This part of the project demonstrates API endpoints testing approach, test design, and bug reporting skills.
API analysis is used to support UI and end-to-end authorization testing.

## UI Test Structure Notes
UI tests are organized based on the complexity and behavior of the tested area.
- For isolated components (Elements), tests focus on direct UI checks.
- For Book Store functionality, tests are grouped by intent:
  - `ui/` — UI-level checks (layout, labels, element visibility)
  - `flows/` — functional user flows (authentication, navigation, state changes)

- Authorization automation is split into three layers:
  - Login UI validation
  - Login functionality (positive / negative)
  - Authorization session flow (state-based behavior)

## CI / GitHub Actions (learning setup)
As part of learning test automation workflows, I experimented with a basic CI pipeline using **GitHub Actions**.
The pipeline runs **only on Pull Requests to `main`** and executes the full automated test suite.

Some tests may fail consistently due to known issues in the DemoQA application.  
This is expected and intentional — the goal is to demonstrate:
- real UI test execution
- handling of unstable test environments
- collecting failure artifacts (screenshots)
### What is included:
- PR-only test execution
- Automated test run via `npm test`
- Screenshots saved as artifacts on test failures

This setup is primarily educational and was added to better understand how automated tests can be integrated into CI pipelines.

## Notes
ChromeDriver is managed via the chromedriver package.
Tests are written using Mocha + Chai + Selenium WebDriver.
Async/await is used consistently for reliable asynchronous handling.
Screenshot capture is enabled for failing tests.

