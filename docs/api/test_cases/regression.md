# API Regression Testing
## Authorization
### Test Case ID: API-AUTH-REGRESSION-001  
### Title: Authorization with non-existing user credentials
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for credentials that do not belong to any existing user.
### Preconditions:
- No user exists with the provided username
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
Verify that authorization endpoint returns `404 Not Found` for an existing user with leading spaces in username.
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
### Title: Authorization with leading spaces in password
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user with leading spaces in password.
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
Verify that authorization endpoint returns `404 Not Found` for an existing user with trailing spaces in username.
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
Verify that authorization endpoint returns `404 Not Found` for an existing user with trailing spaces in password.
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
  "password": "Qwerty123! "
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-006  
### Title: Authorization with Cyrillic character in username instead of Latin
**Description:**  
Verify that authorization endpoint returns `404 Not Found` when the username contains a visually similar Cyrillic character instead of a Latin one.
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
  "userName": "Nаme",
  "password": "Qwerty123!"
}
**Notes:**
Latin "a" replaced with Cyrillic "а" (U+0430) in username.
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-007  
### Title: Authorization with Cyrillic character in password instead of Latin
**Description:**  
Verify that authorization endpoint returns `404 Not Found` when the password contains a visually similar Cyrillic character instead of a Latin one.
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
  "userName": "Nаme",
  "password": "Qwеrty123!"
}
**Notes:**
Latin "e" replaced with Cyrillic "е" (U+0435) in password.
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-008  
### Title: Authorization with non-complete username
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user if the username is not fully filled in.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name User123`
- password: `Qwe123!!!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name User12",
  "password": "Qwe123!!!"
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-009  
### Title: Authorization with non-complete password
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user if the password is not fully filled in.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name User123`  
- password: `Qwe123!!!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name User123",
  "password": "Qwe123!!"
}
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-010  
### Title: Authorization with maximum allowed length of valid existing credentials
**Description:**  
Verify that authorization endpoint returns `200 OK` and `true` for an existing user with maximum allowed length (42 characters) of credentials.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&A`  
- password: `01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&A`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&A",
  "password": "01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&A"
}
### Expected result:
- Response status: 200 OK
- Response body: true

### Test Case ID: API-AUTH-REGRESSION-011  
### Title: Authorization with credentials exceeding maximum allowed length
**Description:**  
Verify that authorization endpoint rejects credentials exceeding the maximum allowed length (42 character).
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "ThisUserCanNotExist!@#$%^&*AAAAAAAaaaaaaaa1",
  "password": "01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&AA"
}
### Expected result:
- Response status: 400 Bad Request

### Test Case ID: API-AUTH-REGRESSION-012  
### Title: Authorization with special characters in the credentials
**Description:**  
Verify that authorization endpoint returns `200 OK` and `true` for an existing user with special characters in the credentials.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `!1Aa@#$%^&*()_+=-`~[]{};':,./<>?|`  
- password: `!1Aa@#$%^&*()_+=-`~[]{};':,./<>?|`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "!1Aa@#$%^&*()_+=-`~[]{};':,./<>?|",
  "password": "!1Aa@#$%^&*()_+=-`~[]{};':,./<>?|"
}
### Expected result:
- Response status: 200 OK
- Response body: true

### Test Case ID: API-AUTH-REGRESSION-013  
### Title: Authorization with non-ASCII characters in the credentials
**Description:**  
Verify that authorization endpoint returns `200 OK` and `true` for an existing user with non-ASCII in the credentials.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Имя1`  
- password: `!Пароль23Aa`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Имя1",
  "password": "!Пароль23Aa"
}
**Notes:**
Ensure that last two letters in password ("Aa") are Latin.
### Expected result:
- Response status: 200 OK
- Response body: true
**Assumption:**
Behavior is considered acceptable due to lack of explicit restrictions in requirements.

### Test Case ID: API-AUTH-REGRESSION-014  
### Title: Authorization with SQL injection in password
**Description:**  
Verify that authorization endpoint handled gracefully SQL-injection in password
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Name test",
  "password": "' OR 1=1 --"
}
### Expected result:
- Response status: 400 Bad Request (or equivalent validation error)
- No internal error details exposed

### Test Case ID: API-AUTH-REGRESSION-015  
### Title: Authorization with destructive SQL payload in username
**Description:**  
Verify that authorization endpoint handled gracefully destructive SQL payload in username
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "\"; DROP TABLE --",
  "password": "Password1!"
}
### Expected result:
- Response status: 400 Bad Request (or equivalent validation error)
- Request is rejected without executing payload
- No stack trace or HTML error page returned

### Test Case ID: API-AUTH-REGRESSION-016 
### Title: Authorization is case-insensitive for username field
**Description:**  
Verify that authorization endpoint returns `200 OK` and `true` for an existing user using different letter case in the username as per typical authentication behavior.
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
  "userName": "nAME",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 200 OK
- Response body: true

### Test Case ID: API-AUTH-REGRESSION-017  
### Title: Authorization with incorrect password letter case
**Description:**  
Verify that authorization endpoint properly handles credentials with incorrect password letter case.
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
  "password": "qwerty123!"
}
### Expected result:
- Response status: 401 Unauthorized (or equivalent authentication error)
- No internal error details exposed

### Test Case ID: API-AUTH-REGRESSION-018  
### Title: Authorization with missing required fields
**Description:**  
Verify that authorization endpoint handles gracefully empty request body or missing required fields.
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
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 400 Bad Request (or equivalent validation error)
- No internal error details exposed
- No stack trace or HTML error page returned

### Test Case ID: API-AUTH-REGRESSION-019  
### Title: Authorization with unsupported Content-Type header
**Description:**  
Verify that authorization endpoint handles gracefully unsupported request header value.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. "Content-Type" header: "text/plain" 
3. Request body (application/json):
{
  "userName": "Name",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 400 Bad Request (or equivalent validation error)
- No internal error details exposed
- No stack trace or HTML error page returned

### Test Case ID: API-AUTH-REGRESSION-020  
### Title: Authorization with malformed Content-Type header (unsupported charset)
**Description:**  
Verify that authorization endpoint handles gracefully unsupported charset in Content-Type header.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. "Content-Type" header: "application/json; charset=UTF-16" 
3. Request body (application/json):
{
  "userName": "Name",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 400 Bad Request (or equivalent validation error)
- No internal error details exposed
- No stack trace or HTML error page returned

## Generate Token
### Test Case ID: API-GENERATE-REGRESSION-001  
### Title: Generate token for non-existing user credentials
**Description:**  
Verify that generate token endpoint returns `"status": "Failed"` and `"token": null` for credentials that do not belong to any existing user.
### Preconditions:
- No user exists with the provided username
**Test data:**  
- userName: `Name Non_existing_user1`  
- password: `WrongPassword!123`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "Name Non_existing_user1",
  "password": "WrongPassword!123"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-002  
### Title: Generate token request with incorrect password letter case
**Description:**  
Verify that generate token endpoint returns `"status": "Failed"` and `"token": null` for user with incorrect password letter case.
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
  "password": "QWerty123!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-003 
### Title: Generate token request is case-insensitive for username field
**Description:**  
Verify that generate token endpoint returns `200 OK` and successful token generation response for an existing user using different letter case in the username as per typical login behavior.
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
  "userName": "nAME",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: not null,
  - expires: valid datetime in the future,
  - status: "Success",
  - result: "User authorized successfully."

### Test Case ID: API-GENERATE-REGRESSION-004  
### Title: Generate token request with leading spaces in username
**Description:**  
Verify that GenerateToken endpoint properly handles leading whitespace in username.
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
  "userName": " Name",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-005  
### Title: Generate token request with leading spaces in password
**Description:**  
Verify that GenerateToken endpoint properly handles leading whitespace in password.
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
  "password": " Qwerty123!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-006  
### Title: Generate token request with trailing spaces in username
**Description:**  
Verify that GenerateToken endpoint properly handles trailing whitespace in username.
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
  "userName": "Name ",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-007  
### Title: Generate token request with trailing spaces in password
**Description:**  
Verify that GenerateToken endpoint properly handles trailing whitespace in password.
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
  "password": "Qwerty123! "
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-008  
### Title: Generate token request with Cyrillic character in username instead of Latin
**Description:**  
Verify that generate token endpoint returns `"status": "Failed"` and `"token": null` when the username contains a visually similar Cyrillic character instead of a Latin one.
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
  "userName": "Nаme",
  "password": "Qwerty123!"
}
**Notes:**
Latin "a" replaced with Cyrillic "а" (U+0430) in username.
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-009  
### Title: Generate token request with Cyrillic character in password instead of Latin
**Description:**  
Verify that generate token endpoint returns `"status": "Failed"` and `"token": null` when the password contains a visually similar Cyrillic character instead of a Latin one.
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
  "userName": "Nаme",
  "password": "Qwеrty123!"
}
**Notes:**
Latin "e" replaced with Cyrillic "е" (U+0435) in password.
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-010  
### Title: Generate token request with incomplete username
**Description:**  
Verify that generate token endpoint returns `"status": "Failed"` and `"token": null` for an existing user if the username is not fully filled in.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name User123`
- password: `Qwe123!!!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "Name User12",
  "password": "Qwe123!!!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-011  
### Title: Generate token request with incomplete password
**Description:**  
Verify that generate token endpoint returns `"status": "Failed"` and `"token": null` for an existing user if the password is not fully filled in.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name User123`  
- password: `Qwe123!!!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "Name User123",
  "password": "Qwe123!!"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-012  
### Title: Generate token for existing user with credentials at maximum allowed length
**Description:**  
Verify that generate token endpoint returns `200 OK` and successful token generation response for an existing user which has exactly the maximum allowed length (42 characters) of credentials.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&A`  
- password: `01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&A`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&A",
  "password": "01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&A"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token — not null,
  - expires — valid datetime in the future,
  - status: "Success"

### Test Case ID: API-GENERATE-REGRESSION-013  
### Title: Generate token request with credentials exceeding maximum allowed length
**Description:**  
Verify that generate token endpoint properly handles credentials that exceed the maximum allowed length (42 character).
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "ThisUserCanNotExist!@#$%^&*AAAAAAAaaaaaaaa1",
  "password": "01!@#$%^&*AAAAAAAaaaaaaa2345678901!@#$%^&AA"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-014  
### Title: Generate token for user with special characters in the credentials
**Description:**  
Verify that generate token endpoint returns `200 OK` and successful token generation response for an existing user with special characters in the credentials.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `!1Aa@#$%^&*()_+=-`~[]{};':,./<>?|`  
- password: `!1Aa@#$%^&*()_+=-`~[]{};':,./<>?|`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "!1Aa@#$%^&*()_+=-`~[]{};':,./<>?|",
  "password": "!1Aa@#$%^&*()_+=-`~[]{};':,./<>?|"
}
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token — not null,
  - expires — valid datetime in the future,
  - status: "Success"

### Test Case ID: API-GENERATE-REGRESSION-015  
### Title: Generate token for user with non-ASCII characters in the credentials
**Description:**  
Verify that generate token endpoint returns `200 OK` and successful token generation response for an existing user with non-ASCII in the credentials.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Имя1`  
- password: `!Пароль23Aa`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "Имя1",
  "password": "!Пароль23Aa"
}
**Notes:**
Ensure that last two letters in password ("Aa") are Latin.
### Expected result:
- Response status: 200 OK
- Response body contains:
  - token — not null,
  - expires — valid datetime in the future,
  - status: "Success"
**Assumption:**
Behavior is considered acceptable due to lack of explicit restrictions in requirements.

### Test Case ID: API-GENERATE-REGRESSION-016  
### Title: Generate token request with SQL injection in username
**Description:**  
Verify that generate token endpoint handles gracefully SQL-injection in username field
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "' OR 1=1 --",
  "password": "Password1!"
}
### Expected result:
- No internal error details exposed
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-017  
### Title: Generate token request with destructive SQL payload in password
**Description:**  
Verify that generate token endpoint handles gracefully destructive SQL payload in password field
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. Request body (application/json):
{
  "userName": "Name test",
  "password": "\"; DROP TABLE --"
}
### Expected result:
- Request is rejected without executing payload
- No stack trace or HTML error page returned
- Response status: 200 OK
- Response body contains:
  - token: null,
  - expires: null,
  - status: "Failed"

### Test Case ID: API-GENERATE-REGRESSION-018  
### Title: Generate token request with missing required fields
**Description:**  
Verify that generate token endpoint handles gracefully empty request body or missing required fields.
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
  "userName": "Name"
}
### Expected result:
- Response status: 400 Bad Request (or equivalent validation error)
- Response body contains: 
   - code,
   - message
- No internal error details exposed
- No stack trace or HTML error page returned

### Test Case ID: API-GENERATE-REGRESSION-019  
### Title: Generate token request with unsupported Content-Type header
**Description:**  
Verify that generate token endpoint handles gracefully unsupported request header value.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. "Content-Type" header: "text/plain" 
3. Request body (application/json):
{
  "userName": "Name",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 400 Bad Request (or equivalent validation error)
- Response body contains: 
   - code,
   - message
- No internal error details exposed
- No stack trace or HTML error page returned

### Test Case ID: API-GENERATE-REGRESSION-020  
### Title: Generate token request with malformed Content-Type header (unsupported charset)
**Description:**  
Verify that generate token endpoint handles gracefully unsupported charset in Content-Type header.
### Preconditions:
- Existing user account exists with the test data credentials
**Test data:**  
- userName: `Name`  
- password: `Qwerty123!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/GenerateToken`
2. "Content-Type" header: "application/json; charset=UTF-16" 
3. Request body (application/json):
{
  "userName": "Name",
  "password": "Qwerty123!"
}
### Expected result:
- Response status: 400 Bad Request (or equivalent validation error)
- Response body contains: 
   - code,
   - message
- No internal error details exposed
- No stack trace or HTML error page returned