# API-GENERATE
## Bug-009
**Title:** Generate token endpoint treats password as case-insensitive
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/GenerateToken  
**Severity:** High 
**Found during:** API regression testing  
**Related test cases:**
- API-GENERATE-REGRESSION-002
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/GenerateToken` 
with request body:
   {
     "userName": "Name",
     "password": "QWerty123!"
   }
2. Observe response status code and body.
**Actual result:**
- Status code: 200 OK
- Response body contains:
  - token — not null,
  - expires — valid ISO 8601 datetime in the future,
  - status: "Success",
  - result: "User authorized successfully."
**Expected result:**
- Authentication should fail for invalid credentials
- Response should indicate unsuccessful authorization
- No token should be generated
- Expected error response should follow existing endpoint error handling conventions:
  - Status code: 200 OK
  - Response body contains:
    - token: null,
    - status: "Failed"
**Notes:**
- Similar issue observed in endpoint /Account/v1/Authorized (Bug-008)
- Login API accepts password without case sensitivity
- This behavior can even contradict the password complexity requirements enforced during user registration (uppercase and lowercase letters are required)
- Such inconsistency may weaken login security and allow unintended credential matching

## Bug-010
**Title:** GenerateToken ignores trailing spaces in credentials
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/GenerateToken 
**Severity:** Medium 
**Found during:** API regression testing  
**Related test cases:**
- API-GENERATE-REGRESSION-006
- API-GENERATE-REGRESSION-007
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/GenerateToken`
with request body:
   {
     "userName": "Name ",
     "password": "Qwerty123! "
   }
2. Observe response status code and body.
**Actual result:**
- Status code: 200 OK
- Response body contains:
  - token — not null,
  - expires — valid datetime in the future,
  - status: "Success"
**Expected result:**
- Login should fail for credentials containing trailing whitespaces
- Response should indicate unsuccessful authorization
- No token should be generated
- Expected error response should follow existing endpoint error handling conventions:
  - Status code: 200 OK
  - Response body contains:
    - token: null,
    - status: "Failed"
**Notes:**
- Similar issue observed in endpoint /Account/v1/Authorized (Bug-003)
- Reproducible when trailing whitespace is present in either username or password field
- The issue affects multiple credential fields and appears to be caused by missing input normalization
- This behavior may allow unintended credential matching
- Other whitespace scenarios (leading spaces, internal spaces) are handled correctly
