# API Smoke Testing
## Authorization
### Test Case ID: API-AUTH-SMOKE-001  
### Title: Authorization with existing user credentials
**Description:**  
Verify that authorization endpoint returns `200 OK` and `true` for an existing user with correct credentials.
### Preconditions:
- Existing user account exists with the test data credentials
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
- Response headers contain:
  - Content-Type: application/json; charset=utf-8

### Test Case ID: API-AUTH-SMOKE-002  
### Title: Authorization with incorrect password for existing user
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user with correct username and incorrect password.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name",
  "password": "Qwerti123!"
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-SMOKE-003  
### Title: Authorization with incorrect username for existing user
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for a non-existing valid username with the password from existing user.
### Preconditions:
- Existing user account exists with the test data credentials
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
- Existing user account exists with the test data credentials
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
- Existing user account exists with the test data credentials
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

## Generate Token
### Test Case ID: API-GENERATE-SMOKE-001  
### Title: Generate token for existing user credentials
**Description:**  
Verify that generate token endpoint returns `200 OK` and successful token generation response for an existing user with correct credentials.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "Name",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token — not null, non-empty string (observed JWT-like format),
  - expires — valid ISO 8601 datetime in the future,
  - status: "Success",
  - result: "User authorized successfully."
- Response headers contain:
  - Content-Type: application/json; charset=utf-8

### Test Case ID: API-GENERATE-SMOKE-002  
### Title: Generate token request with incorrect password for existing user
**Description:**  
Verify that generate token endpoint returns `"status": "Failed"` and `"token": null` for an existing user with correct username and incorrect password.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "Name",
  "password": "Qwerti123!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed",
  - result: "User authorization failed."

### Test Case ID: API-GENERATE-SMOKE-003  
### Title: Generate token request with incorrect username for existing user
**Description:**  
Verify that generate token endpoint returns `"status": "Failed"` and `"token": null` for a non-existing valid username with the password from existing user.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "Namo",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed",
  - result: "User authorization failed."

### Test Case ID: API-GENERATE-SMOKE-004  
### Title: Generate token request with empty password
**Description:**  
Verify that generate token endpoint returns `400 Bad Request` for an existing user with valid username and empty password.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "Name",
  "password": ""
}
### Expected result:
- Response status: 400 Bad Request
- Response body contains:
  - error code,
  - error message

## Delete User Account
### Test Case ID: API-USER-DEL-SMOKE-001  
### Title: Successful user account deletion
**Description:**  
Verify that DELETE User endpoint allows an authenticated user to delete their own account
### Preconditions:
- User account exists in the system
(can be created via POST /Account/v1/User)
- Valid, non-expired access token is issued for this user
(can be obtained via POST /Account/v1/GenerateToken)
**Test data:**  
- UUID- valid User ID of an existing user
- access_token- valid, non-expired access token issued for this user
### Steps:
1. Send a DELETE request to  
   `https://demoqa.com/Account/v1/User/{UUID}`
with header
Authorization: Bearer <access_token>
### Expected result:
- Response status: 204 No Content
- Response body is empty
- Subsequent GET request to /Account/v1/User/{UUID} returns an error indicating that the user no longer exists (401 Unauthorized or 404 Not Found)

### Test Case ID: API-USER-DEL-SMOKE-002  
### Title: DELETE User request without Authorization header
**Description:**  
Verify that DELETE User endpoint does not allow user deletion without authorization
### Preconditions:
- User account exists in the system
(can be created via POST /Account/v1/User)
**Test data:**  
- UUID- valid User ID of an existing user
### Steps:
1. Send a DELETE request to  
   `https://demoqa.com/Account/v1/User/{UUID}`
without Authorization header
### Expected result:
- Response status: 401 Unauthorized
- Response body contains:
  - error code,
  - error message
