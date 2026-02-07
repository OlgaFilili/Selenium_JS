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
1. Send a POST request to  
   `https://demoqa.com/Account/v1/User`
2. Request body (application/json):
{
  "userName": "Test User Reg-1",
  "password": "password1!"
}
3. Observe response status code and body.
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
1. Send a POST request to  
   `https://demoqa.com/Account/v1/User`
2. Request body (application/json):
{
  "userName": "Test User Reg-2",
  "password": "PASSWORD2!"
}
3. Observe response status code and body.
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
1. Send a POST request to  
   `https://demoqa.com/Account/v1/User`
2. Request body (application/json):
{
  "userName": "Test User Reg-3",
  "password": "Password!"
}
3. Observe response status code and body.
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
1. Send a POST request to  
   `https://demoqa.com/Account/v1/User`
2. Request body (application/json):
{
  "userName": "Test User Reg-4",
  "password": "Password4"
}
3. Observe response status code and body.
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
Verify that the register endpoint does not allow creating a new user when the password includes less than 8 charachters.
### Preconditions:
- User with provided userName does not exist in the system
**Test data:**  
- userName: `Test User Reg-5`  
- password: `Psswd!5`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/User`
2. Request body (application/json):
{
  "userName": "Test User Reg-5",
  "password": "Psswd!5"
}
3. Observe response status code and body.
### Expected result:
- Response status: 400 Bad Request
- Response body (JSON containing):
    - error code
    - error message contains requirements to password
**Notes:**
- Actual error message includes full password complexity requirements.