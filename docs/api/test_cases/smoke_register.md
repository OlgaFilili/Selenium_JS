# API Smoke Testing
## Register
### Test Case ID: API-REGISTER-SMOKE-001  
### Title: Register new user with valid credentials
**Description:**  
Verify that the register endpoint successfully creates a new user.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `Test User 1`  
- password: `Psswrd1!`
### Steps:
1. Send a POST request to `https://demoqa.com/Account/v1/User` with request body (application/json):
{
  "userName": "Test User 1",
  "password": "Psswrd1!"
}
2. Observe response status code and body.
### Expected result:
- Response status: 201 Created
- Response body contains:
    - userID (UUID),
    - username matching the provided userName,  
    - empty books list
**Notes:**
- API returns 'username' lowercase, request uses 'userName'
- Created user can be successfully authenticated using POST /GenerateToken

### Test Case ID: API-REGISTER-SMOKE-002  
### Title: Trying to register a new user with an empty required field
**Description:**  
Verify that the register endpoint does not allow creating a new user with empty required fields.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**
- userName: `Test User 2`  
- password: `Psswrd2!`
### Steps:
Scenario A: empty password
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": "Test User 2",
     "password": ""
   }
2. Observe response status code and body.

Scenario B: empty userName
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": "",
     "password": "Psswrd2!"
   }
2. Observe response status code and body.
### Expected result:
- Response status: 400 Bad Request
- Response body (JSON containing):
    - error code
    - error message indicating the requirements of both parameters
