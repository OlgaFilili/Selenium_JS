# API Testing — DemoQA Book Store
This section contains API test artifacts created to validate the functionality, stability, and security of DemoQA Book Store API endpoints.
The focus is on negative, boundary, regression, and security-related scenarios.
## Project Structure
docs/
 └── api/
     ├── README.md
     ├── test-cases/
     │    ├── smoke.md
     │    └── regression.md
     └── bugs/
          ├── api_auth.md
          └── (other endpoints)
## Scope
The following API endpoints is covered:
- `POST /Account/v1/Authorized`

Test coverage includes:
- Smoke testing
- Negative and boundary testing
- Regression testing
- Basic security-related checks
---
## Test Artifacts
### Test Cases
Test cases are organized by test type:
- `test_cases/smoke.md` — basic API availability and validation checks
- `test_cases/regression.md` — extended negative, boundary, and whitespace-related scenarios

Each test case includes:
- Preconditions
- Test data
- Steps
- Expected results
### Bugs
All discovered issues related to the authorization endpoint are documented in:
- `bugs/api_auth.md`

Bug reports include:
- Clear reproduction steps
- Actual vs expected results
- Severity
- Relation to test cases (where applicable)
---

## Test Data Assumptions
- Test data is assumed to be available on the test environment.
- Existing users are created beforehand and reused across test cases.
- Cleanup and data reset are out of scope for the current test coverage.
- User accounts referenced in test cases are pre-existing and stable unless stated otherwise.

## Traceability
Bug reports include references to related test cases to maintain traceability between tests and detected defects.

## Notes
- API behavior was validated using Postman.
- Swagger documentation provided by DemoQA was used as a reference (https://demoqa.com/swagger/).
- This documentation represents a manual testing and analysis effort and is intended for portfolio demonstration purposes.