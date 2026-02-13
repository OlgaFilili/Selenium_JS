## Bug-014
**Title:** DELETE /User returns 200 OK for invalid UUID instead of client error status
**Environment:** DemoQA Book Store API  
**Endpoint:** DELETE /Account/v1/User/{UUID}  
**Severity:** High  
**Found during:** API regression testing  
**Related test cases:**
- API-USER-DEL-REGRESSION-002
- API-USER-DEL-REGRESSION-004
**Preconditions:**
- User account exists in the system
(can be created via POST /Account/v1/User)
- Valid, non-expired access token is issued for this user (access_token)
(can be obtained via POST /Account/v1/GenerateToken)
**Steps to reproduce:**
1. Send DELETE request to `https://demoqa.com/Account/v1/User/{UUID}` where UUID is invalid with header:
Authorization: Bearer <access_token>
2. Observe response status code and body.
**Actual result:**
- 200 OK
- Response body:
{
    "code": "1207",
    "message": "User Id not correct!"
}
**Expected result:**
- 400 Bad Request (invalid UUID format)
or 
- 404 Not Found (UUID valid format but user does not exist)
**Notes:**
- API violates HTTP contract.
- Client cannot reliably detect error by status code.
- This behavior is inconsistent with other DELETE endpoints and common REST practices
- Test data variations for observation:
  - UUID with valid format but non-existing value,
  - UUID with invalid format (e.g. "user-id").
- Behavior is the same when attempting to delete an already deleted user.
- SQL-like payloads in userId (e.g. `' OR '1'='1`, `1; DROP TABLE Users;`) 
  also return `200 OK` with error message in response body.
- API does not distinguish invalid identifiers by HTTP status code.

## Bug-015
**Title:** DELETE /User returns HTML error response instead of JSON for missing UUID in the path
**Environment:** DemoQA Book Store API  
**Endpoint:** DELETE /Account/v1/User/{UUID}  
**Severity:** Low  
**Found during:** API exploratory testing  
**Related test cases:**
- API-USER-DEL-REGRESSION-006
**Preconditions:**
- User account exists in the system
(can be created via POST /Account/v1/User)
- Valid, non-expired access token is issued for this user (access_token)
(can be obtained via POST /Account/v1/GenerateToken)
**Steps to reproduce:**
1. Send DELETE request to `https://demoqa.com/Account/v1/User/` with header:
Authorization: Bearer <access_token>
2. Observe response status code and body.
**Actual result:**
- 404 Not Found
- Response body:
```<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot DELETE /Account/v1/User/</pre> </body> </html>```
**Expected result:**
- 404 Not Found
- Response body in JSON format contains:
  - error code,
  - error message indicating invalid endpoint or missing user identifier
**Notes:**
- Error handled by web layer, not API.
- Response format inconsistent with API contract.

## Bug-016
**Title:** DELETE /User returns HTML error response instead of JSON for destructive payload in the path
**Environment:** DemoQA Book Store API  
**Endpoint:** DELETE /Account/v1/User/{UUID}  
**Severity:** Low  
**Found during:** API security testing  
**Related test cases:**
- API-USER-DEL-REGRESSION-007
**Preconditions:**
- User account exists in the system
(can be created via POST /Account/v1/User)
- Valid, non-expired access token is issued for this user (access_token)
(can be obtained via POST /Account/v1/GenerateToken)
**Steps to reproduce:**
1. Send DELETE request to `https://demoqa.com/Account/v1/User/%00` with header:
Authorization: Bearer <access_token>
2. Observe response status code and body.
**Actual result:**
- 400 Bad Request
- Response body:
```<html> <head> <title>400 Bad Request</title> </head> <body> <center> <h1>400 Bad Request</h1> </center> <hr> <center>nginx/1.17.10 (Ubuntu)</center> </body> </html>```
**Expected result:**
- 400 Bad Request
- Response body in JSON format contains:
  - error code,
  - error message indicating invalid endpoint or missing user identifier
**Notes:**
- Error handled by web layer, not API.
- Response format inconsistent with API contract.
- Frontend may fail to parse HTML response expecting JSON.

## Bug-022
**Title:** DELETE /User allows account deletion using expired access token
**Environment:** DemoQA Book Store API  
**Endpoint:** DELETE /Account/v1/User/{UUID}  
**Severity:** Medium  
**Found during:** API security testing
**Related test cases:**
- API-USER-DEL-REGRESSION-008
**Preconditions:**
- User account exists in the system
(can be created via POST /Account/v1/User)
- An access token for the user has expired (expired_access_token)
(can be obtained via POST /Account/v1/GenerateToken)
- No new access token has been issued after expiration
**Steps to reproduce:**
1. Send DELETE request to `https://demoqa.com/Account/v1/User/{UUID}` with header:
Authorization: Bearer <expired_access_token>
2. Observe response status code and body.
**Actual result:**
- Status code: 204 No Content
- User account is successfully deleted
**Expected result:**
- 401 Unauthorized
- Response body in JSON format contains:
  - error code,
  - error message indicating that user is not authorized.
**Notes:**
- Potential security issue: expired access token is accepted for destructive operation.
- Inconsistent authorization behavior:
    GET /User before deletion returns 401 Unauthorized for the same expired token.
- Indicates missing or incorrect token expiration validation in DELETE /User endpoint.
