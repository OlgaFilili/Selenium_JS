# API-DOC
## Bug-005
**Title:** Missing documentation for possible 200 OK (false) response of Account /Authorized endpoint
**Environment:** DemoQA Book Store documentation (https://demoqa.com/swagger/#/Account/AccountV1AuthorizedPost)
**Severity:** Minor 
**Found during:** API smoke, regression testing  
**Preconditions:**
- User registered in the system with valid credentials
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/Authorized` with:
   {
     "userName": "Test_username",
     "password": "Test_password1!"
   }
2. Observe response: 200 OK, body: false  
**Actual result:**
- Status code: 200 OK
- Response body: false
**Expected result:**
- Swagger documentation should include description of possible 200 OK response with boolean false, including conditions under which it is returned.
**Notes:**
- The document should clarify and include the description of /Authorized end-point undocumented authorization state
- It seems that response body false to 200 OK state corresponds to user which was not activated

## Bug-006
**Title:** API contract violation for Account /GenerateToken endpoint
**Environment:** DemoQA Book Store documentation (https://demoqa.com/swagger/#/Account/AccountV1GenerateTokenPost)
**Severity:** Minor 
**Found during:** API exploratory testing  
**Steps to reproduce:**
1. Send POST request to `https://demoqa.com/Account/v1/GenerateToken` with:
   {
     "userName": "Test_username",
     "password": "Test_password1!"
   }
2. Observe response: 200 OK with failed status and null token 
**Actual result:**
- Status code: 200 OK
- Response body: 
{
    "token": null,
    "expires": null,
    "status": "Failed",
    "result": "User authorization failed."
}
**Expected result:**
API behavior should be consistent with Swagger documentation:
- either return documented 400 Error for failed token generation
- or update Swagger documentation to include 200 OK response with "status": "Failed" and null token
**Notes:**
- The Swagger documentation does not fully describe all failure scenarios for the /GenerateToken endpoint.
- The documented `400 Bad Request` response was observed when the request body was empty or missing required fields.
- Other failure scenarios are returned as `200 OK` with `"status": "Failed"` and `"token": "null"`, which is not documented.