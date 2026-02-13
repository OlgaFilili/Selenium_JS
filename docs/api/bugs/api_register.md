## Bug-023
**Title:** Register endpoint allows internal whitespace characters in password
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/User 
**Severity:** Medium 
**Found during:** API regression testing  
**Related test cases:**
- API-REGISTER-REGRESSION-006
**Preconditions:**
- User with provided userName does not exist in the system
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/User`
with request body:
   {
     "userName": "Test User Reg-6BUG",
     "password": "Password! 6BUG"
   }
2. Observe response status code and body.
**Actual result:**
- Status code: 201 Created
- Response body contains:
  - UUID,
  - username,
  - empty books list
**Expected result:**
- Register request should be rejected when password contains internal whitespace characters, as it violates password complexity rules.
- Expected error response should follow existing endpoint error handling conventions:
  - Status code: 400 Bad Request
  - Response body contains:
    - error code,
    - error message with explanation
**Notes:**
- User registered with a password containing internal whitespace can be successfully authenticated via POST /GenerateToken, this indicates that inconsistent input is persisted.

## Bug-024
**Title:** Inconsistent whitespace normalization in user registration and authentication
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/User 
**Severity:** High 
**Found during:** API regression testing  
**Related test cases:**
- API-REGISTER-REGRESSION-007
- API-GENERATE-REGRESSION-006
- API-GENERATE-REGRESSION-007
**Preconditions:**
- User with provided userNames does not exist in the system
**Steps to reproduce:**
Scenario A: leading spaces in credentials
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": " Test User Reg-7ABUG",
     "password": " Password!7ABUG"
   }
2. Observe response status code and body.

Scenario B: trailing spaces in credentials
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": "Test User Reg-7BBUG ",
     "password": "Password!7BBUG "
   }
2. Observe response status code and body.
**Actual result:**
For both scenarios:
- Status code: 201 Created
- Response body contains:
  - UUID,
  - username,
  - empty books list
**Expected result:**
For both scenarios:
- input is either rejected or normalized consistently
- authentication behavior matches registration behavior
**Notes:**
- Observed inconsistent whitespace handling:
    - trailing spaces are trimmed during authentication
    - leading spaces are preserved and treated as part of credentials
    This leads to inconsistent authentication behavior and user confusion.
- Related whitespace normalization issues were also observed in authentication endpoints:
  - /Account/v1/Authorized (Bug-003)
  - /Account/v1/GenerateToken (Bug-010)

## Bug-025
**Title:** Register endpoint allows userName consisting only of whitespace characters
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/User 
**Severity:** High 
**Found during:** API regression testing  
**Related test cases:**
- API-REGISTER-REGRESSION-008
**Preconditions:**
- User with provided userName does not exist in the system
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/User`
with request body:
   {
     "userName": "  ",
     "password": "Password!8BUG"
   }
2. Observe response status code and body.
**Actual result:**
- Status code: 201 Created
- Response body contains:
  - UUID,
  - username,
  - empty books list
**Expected result:**
- UserName must contain at least one non-whitespace character.
- Register request should be rejected when userName consists only from whitespace characters.
- Expected error response should follow existing endpoint error handling conventions:
  - Status code: 400 Bad Request
  - Response body contains:
    - error code,
    - error message with explanation
**Notes:**
- User registered with a whitespace-only userName can be successfully authenticated via POST /GenerateToken, this indicates that invalid input is persisted and violates security and identification issues.

## Bug-026
**Title:** Register endpoint allows create new user with already existing userName and different password
**Environment:** DemoQA Book Store API  
**Endpoint:** POST /Account/v1/User 
**Severity:** High 
**Found during:** API regression testing  
**Related test cases:**
- API-REGISTER-REGRESSION-009
**Preconditions:**
- User with provided userName exists in the system but with different password
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/User`
with request body:
   {
     "userName": "Test User 1",
     "password": "Password!9BUG"
   }
2. Observe response status code and body.
**Actual result:**
- Status code: 201 Created
- Response body contains:
  - UUID,
  - username,
  - empty books list
**Expected result:**
- UserName must be unique.
- Register request should be rejected when userName is equal to already existed one.
- Expected error response should follow existing endpoint error handling conventions:
  - Status code: 406 Not Acceptable
  - Response body contains:
    - error code,
    - error message indicating the existence of the user
**Notes:**
- Behavior differs depending on password: 
  - Fully matching credentials (userName + password) are correctly rejected with 406 Not Acceptable.
  - Same userName with different password incorrectly creates a new user (201 Created), violating uniqueness.
- User registered with an already existed userName can be successfully authenticated via POST /GenerateToken, this indicates that the system allows duplicate identifiers, which may lead to authentication ambiguities and security risks.

