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
          ├── api_generate.md
          ├── api_security.md
          ├── documentation.md
          └── (other endpoints)
## Scope
The following API endpoints are covered:
- `POST /Account/v1/Authorized`
- `POST /Account/v1/GenerateToken`

Test coverage includes:
- Smoke testing
- Negative and boundary testing
- Regression testing
- Basic security-related checks

## Relation to UI Automation
API testing in this project was performed as an independent testing layer, focused on validating backend behavior, error handling, and security-related scenarios.
The results of API analysis were later used to support UI automation, specifically:
- Designing authorization-related UI test scenarios (positive, negative, and edge cases)
- Verifying session-based behavior (login state, logout, and authorization persistence)
- Automated UI tests that rely on these scenarios can be found in:
  - `tests/book_store/flows/`
  - `tests/book_store/ui/`

This reflects a real-world approach where API analysis supports UI and end-to-end testing.

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
All discovered issues related to the generateToken endpoint are documented in:
- `bugs/api_generate.md`
All discovered issues related to the security issues are documented in:
- `bugs/api_security.md`
Suggestions related to the documentation of DemoQA Book Store API are documented in:
- `bugs/documentation.md`

Bug reports include:
- Clear reproduction steps
- Actual vs expected results
- Severity
- Relation to test cases (where applicable)

## Test Data Assumptions
- Test data is assumed to be available on the test environment.
- Existing users are created beforehand and reused across test cases.
- Cleanup and data reset are out of scope for the current test coverage.
- User accounts referenced in test cases are pre-existing and stable unless stated otherwise.

## Traceability
Bug reports include references to related test cases to maintain traceability between tests and detected defects.

## Known Limitations and Open Questions
The following aspects were intentionally left out of scope or require clarification in a real production environment:
### Token expiration behavior
  - Token validity duration was not verified due to long expiration time and limitations of the demo environment.
  - Behavior after token expiration (reuse, rejection, refresh) requires clarification.
### Multiple token generation for the same user
  - It was not verified whether previously issued tokens remain valid after a new token is generated.
  - Token invalidation and session management rules are not documented in the API specification.
### Input validation rules
  - Maximum allowed length for credentials appears to be enforced inconsistently across UI and API.
  - Character set restrictions (e.g., non-ASCII characters, spaces) are not explicitly documented and were treated as accepted behavior due to lack of stated requirements.
### Error handling consistency
  - Some endpoints expose internal implementation details under malformed requests (documented as bugs).
  - Expected standard error response format for validation errors is not clearly defined in the documentation.
These items represent open questions that would normally be clarified with product owners or backend developers in a real project.

## Notes
- API behavior was validated using Postman.
- Swagger documentation provided by DemoQA was used as a reference (https://demoqa.com/swagger/).
- This documentation represents a manual testing and analysis effort and is intended for portfolio demonstration purposes.