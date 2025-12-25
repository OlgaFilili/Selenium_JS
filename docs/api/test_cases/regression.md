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

### Test Case ID: API-AUTH-REGRESSION-006  
### Title: Authorization with cyrillic symbols in username
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user if the username includes a cyrillic symbol instead of similar looking latin.
### Preconditions:
- Existing user account exists in the system with test data credentials
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
3. Ensure that in userName latin "a" was replaced by cyrillic "а".
### Expected result:
- Response status: 404 Not Found
- Response body: 
{
    "code": "1207",
    "message": "User not found!"
}

### Test Case ID: API-AUTH-REGRESSION-007  
### Title: Authorization with cyrillic symbols in password
**Description:**  
Verify that authorization endpoint returns `404 Not Found` for an existing user if the password includes a cyrillic symbol instead of similar looking latin.
### Preconditions:
- Existing user account exists in the system with test data credentials
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
3. Ensure that in password latin "e" was replaced by cyrillic "е".
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
- Existing user account exists in the system with test data credentials
**Test data:**  
- userName: `Name User123`
- password: `Qwe123!!!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Nаme User12",
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
- Existing user account exists in the system with test data credentials
**Test data:**  
- userName: `Name User123`  
- password: `Qwe123!!!`
### Steps:
1. Send a POST request to  
   `https://demoqa.com/Account/v1/Authorized`
2. Request body (application/json):
{
  "userName": "Nаme User123",
  "password": "Qwе123!!"
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
- Existing user with the test data credentials
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
- Existing user with the test data credentials
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
- Existing user with the test data credentials
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
3. Ensure that last two letters in password ("Aa") are latin.
### Expected result:
- Response status: 200 OK
- Response body: true

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