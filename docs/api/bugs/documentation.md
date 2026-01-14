# API-DOC
## Bug-005
**Title:** Missing documentation for possible 200 OK (false) response of Account /Authorized endpoint
**Environment:** DemoQA Book Store documentation (https://demoqa.com/swagger/#/Account/AccountV1AuthorizedPost)
**Severity:** Low
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
**Severity:** Low 
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

## Bug-012
**Title:** API contract violation for Account DELETE /User/{UUID} endpoint
**Environment:** DemoQA Book Store documentation (https://demoqa.com/swagger/#/Account/AccountV1UserByUserIdDelete)
**Severity:** Medium 
**Found during:** API exploratory testing  
**Steps to reproduce:**
1. Send DELETE request to `https://demoqa.com/Account/v1/User/{UUID}` with empty body and
Authorization header: Bearer <access_token>
2. Observe response: 204 No Content 
**Actual result:**
- Status code: 204 No Content
- Empty Response body: 
**Expected result:**
Swagger documentation should be updated to reflect actual API behavior:
- Successful deletion returns 204 No Content with empty body.
**Notes:**
- The Swagger documentation is not consistent with responses of DELETE /User endpoint.

## Bug-013
**Title:** Missing Authorization requirement in Swagger documentation for DELETE /User/{UUID}
**Environment:** DemoQA Book Store documentation (https://demoqa.com/swagger/#/Account/AccountV1UserByUserIdDelete)
**Severity:** High 
**Found during:** API exploratory testing  
**Steps to reproduce:**
1. Send DELETE request to `https://demoqa.com/Account/v1/User/{UUID}` without Authorization header and empty body
2. Observe response: 401 Not Authorized
3. Repeat execution with added
Authorization header: Bearer <access_token>
2. Observe response: 204 No Content with empty body
**Actual result:**
- Status code: 204 No Content
- Empty response body 
**Expected result:**
Swagger documentation should include information about Authorization header requirement.
**Notes:**
- The documentation does not contain information about the strictness of the presence of the Authorization header in the DELETE /User request.
- The authenticated user can delete only their own account.
- The userId in the path must match the userId encoded in the access token, Swagger UI does not explicitly document this constraint and may lead to misleading responses.

## Bug-017
**Title:** DELETE /User endpoint documentation does not match actual API responses
**Environment:** DemoQA Book Store documentation (https://demoqa.com/swagger/#/Account/AccountV1UserByUserIdDelete)
**Severity:** Medium 
**Found during:** API exploratory/regression/security testing
**Related test cases:**
- API-USER-DEL-SMOKE-001
- API-USER-DEL-SMOKE-002
- API-USER-DEL-REGRESSION-006
- API-USER-DEL-REGRESSION-007
**Steps to reproduce:**
1. Open Swagger documentation for DELETE /Account/v1/User/{UUID}.
2. Compare the documented responses with actual API behavior observed during testing:
- Success: 204 No Content
- Errors: 400 Bad Request, 401 Unauthorized, 404 Not Found
**Actual result:**
Swagger lists:
- 200 OK as success
- 204 No Content as Unauthorized
- 401 as Error
**Expected result:**
Documentation should list correct responses:
- 204 No Content as successful deletion
- 400, 401, 404 as possible error responses
**Notes:**
- Swagger documentation should be updated to reflect actual API behavior.
- The Swagger documentation is not consistent with responses of DELETE /User endpoint.
- The current Swagger documentation may mislead developers and testers about expected behavior.
- Actual API returns 200 OK for invalid UUID, which is an API bug (Bug-014).
