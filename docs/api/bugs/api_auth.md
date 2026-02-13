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
1. Send POST request to `https://demoqa.com/Account/v1/Authorized`
with request body:
   {
     "userName": " ",
     "password": "Qwerty123!"
   }
2. Observe response status code and body.
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
1. Send POST request to `https://demoqa.com/Account/v1/Authorized`
with request body:
   {
     "userName": "Name ",
     "password": "Qwerty123! "
   }
2. Observe response status code and body.
**Actual result:**
- Status code: 200 OK
- Response body: true
**Expected result:**
- Status code: 404 Not Found
- Authorization should fail for credentials containing trailing whitespaces
**Notes:**
- Similar issue observed in endpoint /Account/v1/GenerateToken (Bug-010)
- Reproducible when trailing whitespace is present in either username or password field
- The issue affects multiple credential fields and appears to be caused by missing input normalization
- This behavior may allow unintended credential matching
- Other whitespace scenarios (leading spaces, internal spaces in username) are handled correctly

## Bug-004
**Title:** Missing centralized credential length validation causes 5xx errors during token generation
**Environment:** DemoQA Book Store API  
**Endpoint:** 
POST /Account/v1/User
POST /Account/v1/GenerateToken
POST /Account/v1/Authorized
**Severity:** High  
**Found during:** API regression testing  
**Related test cases:**
- API-REGISTER-REGRESSION-012
- API-AUTH-REGRESSION-010
**Preconditions:**
User with provided userName does not exist in the system before Step 1.
**Steps to reproduce:**
1. Send a POST request with credentials exceeding 42 characters to `https://demoqa.com/Account/v1/User` with request body (application/json):
  {
    "userName": "This User Can Not Exist In The System!!!!!1",
    "password": "1Password!_Bug"
  }
2. Observe response status code and body.
3. Send POST request to `https://demoqa.com/Account/v1/GenerateToken` with the same credentials.
4. Observe response status code and body.
5. (Optional) Send POST request to `https://demoqa.com/Account/v1/Authorized` with the same credentials.
6. (Optional) Observe response status code and body.
**Actual result:**
Step 2:
- 201 Created
- Response body contains:
    - userID (UUID),
    - username matching the provided userName,  
    - empty books list
- User is successfully registered despite exceeding maximum allowed length
Step 4:
- 502 Bad Gateway
- Server error occurs during token generation.
Step 6 (Optional):
- 200 OK
- Response body: false
**Expected result:**
- Requests exceeding the maximum allowed length (42 characters) must be rejected with:
  - 400 Bad Request
  - Controlled validation error message
- Credential length validation must be enforced consistently across all authentication endpoints
- Server errors (5xx) must never occur due to invalid client input
**Notes:**
- The system allows creation of users with credentials exceeding backend processing limits
- This leads to unstable behavior in downstream endpoints
- Input validation should be performed before any business logic execution
- The defect indicates missing centralized validation logic across authentication flow

## Bug-008
**Title:** Authorization endpoint does not validate password letter case
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/Authorized  
**Severity:** High 
**Found during:** API regression testing  
**Related test cases:**
- API-AUTH-REGRESSION-017
**Preconditions:**
- User exists with username `Name` and password `Qwerty123!`
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/Authorized`
with request body:
   {
     "userName": "Name",
     "password": "qwerty123!"
   }
2. Observe response status code and body.
**Actual result:**
- Status code: 200 OK
- Response body: true
**Expected result:**
- 401 Unauthorized (or equivalent authentication failure response)
- Authorization should fail for invalid credentials
**Notes:**
- Similar issue observed in endpoint /Account/v1/GenerateToken (Bug-009)
- Password comparison appears to be case-insensitive during authorization
- This behavior can even contradict the password complexity requirements enforced during user registration (uppercase and lowercase letters are required)
- Such inconsistency may weaken authentication security and allow unintended credential matching


