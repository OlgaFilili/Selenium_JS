# API-AUTH
## Bug-002 !!!Cannot Reproduce (wrong test data / environment state)
**Comment:** Root cause: test data inconsistency. User with whitespace-only username existed due to previous manual creation. Issue is not reproducible in clean environment.
**Title:** Authorization returns 200 OK with `false` for empty username
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/Authorized  
**Severity:** High  
**Found during:** API smoke, regression testing  
**Related test cases:**
- API-AUTH-SMOKE-005
- API-AUTH-REGRESSION-002
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
- Username does not contain whitespace characters
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/Authorized` with:
   {
     "userName": " ",
     "password": "Qwerty123!"
   }
2. Observe response: 200 OK, body: false  
**Actual result:**
- Status code: 200 OK
- Response body: false
**Expected result:**
- Status code: 400 Bad Request
- Validation error for missing username
**Notes:**
- This inconsistency may allow partial credential validation and user enumeration
- Issue seems specific to cases where correct username does not contain whitespaces character (for usernames containing spaces, e.g. "Name Name"- authorization behaves correctly)
- Other whitespace scenarios (leading spaces, internal spaces in username) are handled correctly

## Bug-003
**Title:** Authorization ignores trailing spaces in credentials
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/Authorized  
**Severity:** Medium 
**Found during:** API regression testing  
**Related test cases:**
- API-AUTH-REGRESSION-004
- API-AUTH-REGRESSION-005
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/Authorized` with:
   {
     "userName": "Name ",
     "password": "Qwerty123! "
   }
2. Observe response: 200 OK, body: true  
**Actual result:**
- Status code: 200 OK
- Response body: true
**Expected result:**
- Status code: 404 Not Found
- Authorization should fail for credentials containing trailing whitespaces
**Notes:**
- This behavior may allow unintended credential matching
- The issue affects multiple credential fields and appears to be caused by missing input normalization
- Other whitespace scenarios (leading spaces, internal spaces in username) are handled correctly

## Bug-004
**Title:** Invalid input validation for maximum allowed length of the credentials
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/Authorized  
**Severity:** Medium  
**Found during:** API regression testing  
**Related test cases:**
- API-AUTH-REGRESSION-010
**Preconditions:**
- Username or password exceeds the maximum allowed length(42 characters).
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/Authorized` with:
  {
    "userName": "ThisUserCanNotExist!@#$%^&*AAAAAAAaaaaaaaa1",
    "password": "01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&AA"
  }
2. Observe response status code and body.
**Actual result:**
Input validation is not performed first.
Depending on internal state, the endpoint returns:
- 200 OK with false
, or
- 404 Not Found
**Expected result:**
- 400 Bad Request
- Validation error for credentials exceeding maximum allowed length
**Notes:**
- UI allows creation of users exceeding backend limits
- Inconsistent handling of existing users with invalid attributes
- Invalid input check should prioritize upon any other checks in the end-point params


