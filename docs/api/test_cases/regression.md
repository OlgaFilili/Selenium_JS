# API Regression Testing
## Authorization
### Test Case ID: API-AUTH-REGRESSION-001  
### Title: Authorization with non-existing user credentials
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for a non-existing user with valid credentials.
### Preconditions:
- 
**Test data:**  
- userName: `Name Non_existing_user1`  
- password: `WrongPassword!123`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name Non_existing_user1",
  "password": "WrongPassword!123"
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-002  
### Title: Authorization with leading spaces in username
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user if the username begins with extra spaces.
### Preconditions:
- Existing user account exists in the system
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": " Name",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-003  
### Title: Authorization with leading spaces in username
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user if the password begins with extra spaces.
### Preconditions:
- Existing user account exists in the system
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name",
  "password": " Qwerty123!"
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-004  
### Title: Authorization with trailing spaces in username
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user if the username ends with extra spaces.
### Preconditions:
- Existing user account exists in the system
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name ",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-005  
### Title: Authorization with trailing spaces in password
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user if the password ends with extra spaces.
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
  "userName": "Name",
  "password": "Qwerty123! "
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}