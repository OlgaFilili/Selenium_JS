# API Smoke Testing
## Authorization
### Test Case ID: API-AUTH-SMOKE-001  
### Title: Authorization with existing user credentials
**Description:**  
Verify that authorization endpoint returns `200 OK` and `true` for an existing user with correct credentials.
### Preconditions:
- Existing user with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 200 OK
- Response body: true
- Response header:
  - content-type: application/json; charset=utf-8

### Test Case ID: API-AUTH-SMOKE-002  
### Title: Authorization with non-correct password
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user with valid username and invalid password
### Preconditions:
- Existing user account exists in the system with the username
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name",
  "password": "Qwerty1231"
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-SMOKE-003  
### Title: Authorization with non-correct username
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for a non-existing username with a password from existing user.
### Preconditions:
- Existing user account exists in the system with the password
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Namo",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-SMOKE-004  
### Title: Authorization with empty password
**Description:**  
Verify that authorization endpoint returns `400 Bad Request` for an existing user with valid username and empty password.
### Preconditions:
- Existing user account exists in the system with the username
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name",
  "password": ""
}
### Expected result:
- Response status: 400 Bad Request
- Response body: 
{
    "code": "1200",
    "message": "UserName and Password required."
}

### Test Case ID: API-AUTH-SMOKE-005  
### Title: Authorization with empty username
**Description:**  
Verify that authorization endpoint returns `400 Bad Request` for an empty username with a password from existing user.
### Preconditions:
- Existing user account exists in the system with the password
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 400 Bad Request
- Response body: 
{
    "code": "1200",
    "message": "UserName and Password required."
}
