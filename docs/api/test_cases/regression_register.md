# API Regression Testing
## Register
### Test Case ID: API-REGISTER-REGRESSION-001  
### Title: Failed registration for a new user with password missing uppercase letter
**Description:**  
Verify that the register endpoint does not allow creating a new user when the password does not contain an uppercase letter.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `Test User Reg-1`  
- password: `password1!`
### Steps:
1. Send a POST request to `https://demoqa.com/Account/v1/User` with request body (application/json):
{
  "userName": "Test User Reg-1",
  "password": "password1!"
}
2. Observe response status code and body.
### Expected result:
- Response status: 400 Bad Request
- Response body (JSON containing):
    - error code
    - error message contains requirements to password
**Notes:**
- Actual error message includes full password complexity requirements.
- Received error message: "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."

### Test Case ID: API-REGISTER-REGRESSION-002  
### Title: Failed registration for a new user with password missing lowercase letter
**Description:**  
Verify that the register endpoint does not allow creating a new user when the password does not contain a lowercase letter.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `Test User Reg-2`  
- password: `PASSWORD2!`
### Steps:
1. Send a POST request to `https://demoqa.com/Account/v1/User` with request body (application/json):
{
  "userName": "Test User Reg-2",
  "password": "PASSWORD2!"
}
2. Observe response status code and body.
### Expected result:
- Response status: 400 Bad Request
- Response body (JSON containing):
    - error code
    - error message contains requirements to password
**Notes:**
- Actual error message includes full password complexity requirements.

### Test Case ID: API-REGISTER-REGRESSION-003  
### Title: Failed registration for a new user with password missing digit
**Description:**  
Verify that the register endpoint does not allow creating a new user when the password does not contain a digit.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `Test User Reg-3`  
- password: `Password!`
### Steps:
1. Send a POST request to `https://demoqa.com/Account/v1/User` with request body (application/json):
{
  "userName": "Test User Reg-3",
  "password": "Password!"
}
2. Observe response status code and body.
### Expected result:
- Response status: 400 Bad Request
- Response body (JSON containing):
    - error code
    - error message contains requirements to password
**Notes:**
- Actual error message includes full password complexity requirements.

### Test Case ID: API-REGISTER-REGRESSION-004  
### Title: Failed registration for a new user with password missing special character
**Description:**  
Verify that the register endpoint does not allow creating a new user when the password does not contain a special character.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `Test User Reg-4`  
- password: `Password4`
### Steps:
1. Send a POST request to `https://demoqa.com/Account/v1/User` with request body (application/json):
{
  "userName": "Test User Reg-4",
  "password": "Password4"
}
2. Observe response status code and body.
### Expected result:
- Response status: 400 Bad Request
- Response body (JSON containing):
    - error code
    - error message contains requirements to password
**Notes:**
- Actual error message includes full password complexity requirements.

### Test Case ID: API-REGISTER-REGRESSION-005  
### Title: Failed registration for a new user with password less than 8 symbols long
**Description:**  
Verify that the register endpoint does not allow creating a new user when the password contains less than 8 charachters.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `Test User Reg-5`  
- password: `Psswd!5`
### Steps:
1. Send a POST request to `https://demoqa.com/Account/v1/User` with request body (application/json):
{
  "userName": "Test User Reg-5",
  "password": "Psswd!5"
}
2. Observe response status code and body.
### Expected result:
- Response status: 400 Bad Request
- Response body (JSON containing):
    - error code
    - error message contains requirements to password
**Notes:**
- Actual error message includes full password complexity requirements.

### Test Case ID: API-REGISTER-REGRESSION-006  
### Title: Failed registration for a new user with password contains internal spaces
**Description:**  
Verify that the register endpoint does not allow creating a new user when the password contains whitespace characters inside the value.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `Test User Reg-6`  
- password: `Password! 6`
### Steps:
1. Send a POST request to `https://demoqa.com/Account/v1/User` with request body (application/json):
{
  "userName": "Test User Reg-6",
  "password": "Password! 6"
}
2. Observe response status code and body.
### Expected result:
- Response status: 400 Bad Request
- Response body (JSON containing):
    - error code
    - error message explains the cause of the error

### Test Case ID: API-REGISTER-REGRESSION-007 
### Title: Registration behavior with leading and trailing whitespaces in credentials
**Description:**  
Verify how the register endpoint handles leading and trailing whitespace in credentials, and ensure consistent behavior between registration and subsequent authentication.
### Preconditions:
- User with provided userNames does not exist in the system
**Test data:**  
Scenario A: leading spaces in credentials
- userName: ` Test User Reg-7A`  
- password: ` Password!7A`
Scenario B: trailing spaces in credentials
- userName: `Test User Reg-7B `  
- password: `Password!7B `
### Steps:
Scenario A: leading spaces in credentials
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": " Test User Reg-7A",
     "password": " Password!7A"
   }
2. Observe response status code and body.

Scenario B: trailing spaces in credentials
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": "Test User Reg-7B ",
     "password": "Password!7B "
   }
2. Observe response status code and body.
### Expected result:
For both scenarios:
- input is either rejected or normalized consistently
- authentication behavior matches registration behavior

### Test Case ID: API-REGISTER-REGRESSION-008 
### Title: Registration behavior with only whitespace characters in userName
**Description:**  
Verify that the register endpoint does not allow creating a new user when userName consists of only whitespaces.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: ` `  
- password: `Password!8`
### Steps:
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": " ",
     "password": "Password!8"
   }
2. Observe response status code and body.
### Expected result:
- Response status: 400 Bad Request
- Response body (JSON containing):
    - error code
    - error message indicates validation error for userName

### Test Case ID: API-REGISTER-REGRESSION-009 
### Title: Registration attempt with an already existing userName and a different password
**Description:**  
Verify that the register endpoint does not allow creating a new user with already existing userName and a different password.
### Preconditions:
- User with provided userName exists in the system with different password
**Test data:**  
- userName: `Test User 1`  
- password: `Password1!`
### Steps:
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": "Test User 1",
     "password": "Password1!"
   }
2. Observe response status code and body.
### Expected result:
- Response status: 406 Not Acceptable
- Response body (JSON containing):
    - error code
    - error message indicating the existence of the user

### Test Case ID: API-REGISTER-REGRESSION-010 
### Title: Repeated registration attempt with already registered credentials
**Description:**  
Verify that the register endpoint does not allow repeating creation a new user with already existing credentials.
### Preconditions:
- User with provided credentials (test data) already exists in the system
**Test data:**  
- userName: `Test User 1`
- password: `Psswrd1!`
### Steps:
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": "Test User 1",
     "password": "Psswrd1!"
   }
2. Observe response status code and body.
### Expected result:
- Registration request is rejected because credentials already exist.
- Response status: 406 Not Acceptable
- Response body (JSON containing):
    - error code
    - error message indicating the existence of the user

### Test Case ID: API-REGISTER-REGRESSION-011 
### Title: Register a new user with valid credentials length equal to 42 characters.
**Description:**  
Verify that the register endpoint successfully creates a new user with maximum allowed credentials length equals to 42 characters.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `This User Has Long Credentials- 42 chars!!`  
- password: `01!@#$%^&*AAAAAAAaaaaaaa2345678901!!!!!!!!`
### Steps:
1. Send a POST request to `https://demoqa.com/Account/v1/User` with request body (application/json):
  {
    "userName": "This User Have Long Credentials- 42 chars!",
    "password": "01!@#$%^&*AAAAAAAaaaaaaa2345678901!!!!!!!!"
  }
2. Observe response status code and body.
### Expected result:
- Response status: 201 Created
- Response body contains:
    - userID (UUID),
    - username matching the provided userName,  
    - empty books list
**Notes:**
- Created user can be successfully authenticated using POST /GenerateToken

### Test Case ID: API-REGISTER-REGRESSION-012 
### Title: Register a new user with valid userName length more than 42 characters.
**Description:**  
Verify that the register endpoint rejects creating a new user with userName length more than 42 characters.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `This User Can Not Exist In The System!!!!!!`  
- password: `1Password!_Bug`
### Steps:
1. Send a POST request to `https://demoqa.com/Account/v1/User` with request body (application/json):
  {
    "userName": "This User Can Not Exist In The System!!!!!!",
    "password": "1Password!_Bug"
  }
2. Observe response status code and body.
### Expected result:
- 400 Bad Request
- Validation error for credentials exceeding maximum allowed length
**Notes:**
- Known ussue: Bug-004 (in api_auth.md)

### Test Case ID: API-REGISTER-REGRESSION-013 
### Title: Verify registration with extended special characters in the credentials
**Description:**  
Verify that the register endpoint successfully creating a new user with special characters in the credentials.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `User_13Aa@#$%^&*()+=-`~[]{};':,./<>?!` 
- password: `Password!13@#$%^&*()_+=-`~[]{};':,./<>?|`
### Steps:
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": "User_13Aa@#$%^&*()+=-`~[]{};':,./<>?!|",
     "password": "Password!13@#$%^&*()_+=-`~[]{};':,./<>?|"
   }
2. Observe response status code and body.
### Expected result:
- Response status: 201 Created
- Response body contains:
    - userID (UUID),
    - username matching the provided userName,  
    - empty books list
**Notes:**
- Created user can be successfully authenticated using POST /GenerateToken

### Test Case ID: API-REGISTER-REGRESSION-014 
### Title: Verify registration with non-ASCII characters in the credentials
**Description:**  
Verify that the register endpoint successfully creating a new user with non-ASCII characters in the credentials.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `Тестовые Имя Фамилия-14` 
- password: `!Пароль14Rr`
### Steps:
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": "Тестовые Имя Фамилия-14",
     "password": "!Пароль14Rr"
   }
2. Observe response status code and body.
### Expected result:
- Response status: 201 Created
- Response body contains:
    - userID (UUID),
    - username matching the provided userName,  
    - empty books list
**Notes:**
- Created user can be successfully authenticated using POST /GenerateToken

### Test Case ID: API-REGISTER-REGRESSION-015 
### Title: Verify that SQL-like input in the username is treated as plain text
**Description:**  
Verify that the register endpoint successfully creating a new user with SQL-like input in the username.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `' OR 15=15 --`
- password: `Password!15`
### Steps:
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with request body (application/json):
   {
     "userName": "' OR 15=15 --",
     "password": "Password!15"
   }
2. Observe response status code and body.
### Expected result:
- Response status: 201 Created
- Response body contains:
    - userID (UUID),
    - username matching the provided userName,  
    - empty books list
**Notes:**
- Created user can be successfully authenticated using POST /GenerateToken

### Test Case ID: API-REGISTER-REGRESSION-016 
### Title: Request structure validation for user registration endpoint
**Description:**  
Verify how the register endpoint handles invalid or unexpected request structure, headers, and fields.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
Scenario A: unsupported Content-type header
  - userName: `Text/plain User`
  - password: `Password!16A`
with header:
  - Content-Type: `text/plain`
Scenario B: missing userName in the request body
  - password: `Password!16B`
Scenario C: invalid required field name
Use "username" instead "userName":
  - username: `Username User`
  - password: `Password!16C`
Scenario D: additional field in the request body
  - userName: `User with extra field`
  - password: `Password!16D`
  - books: `[]`
Scenario E: Authorization header in the request
  - userName: `User with Auth_token`
  - password: `Password!16E`
with header:
  - Authorization: Bearer <access_token>
access_token- valid, non-expired access token issued for any user
### Steps:
1. Send a POST request to  `https://demoqa.com/Account/v1/User` according to the scenarios with request body (application/json) in the Test data.
2. Observe response status code and body.
### Expected result:
- Endpoint behavior is consistent and predictable across scenarios:
Scenarios A, B, C: requests with missing or invalid required fields are rejected:
  - Response status: 400 Bad Request
  - Response body (JSON containing):
    - error code
    - error message indicates validation error for credentials
Scenarios D, E: requests with extra fields or Authorization header are accepted:
  - Created user can be successfully authenticated using POST /GenerateToken
  - Register endpoint is public and ignores extra fields in the request body
  - Response status: 201 Created
  - Response body contains:
      - userID (UUID),
      - username matching the provided userName,  
      - empty books list

### Test Case ID: API-REGISTER-REGRESSION-017 
### Title: Failed registration for a new user with malformed Content-Type header (unsupported charset)
**Description:**  
The register endpoint handles gracefully a request with malformed Content-Type header (unsupported charset)
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `User with charset utf-16`
- password: `Password!17`
### Steps:
1. Send a POST request to  `https://demoqa.com/Account/v1/User` with Content-Type header:
  "Content-Type": `application/json; charset=UTF-16`
and request body (application/json):
  {
    "userName": "User with charset utf-16",
    "password": "Password!17"
  }
2. Observe response status code and body.
### Expected result:
Requests with malformed header are rejected:
  - Response status: 400 Bad Request
  - Response body (JSON containing):
    - error code
    - error message indicates validation error
**Notes:**
- Known ussue: Bug-007 (in api_security.md)


