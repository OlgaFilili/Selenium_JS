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