## Bug-033
**Title:** UI requires First Name and Last Name fields while API does not support them
**Environment:** DemoQA Book Store Register Page (https://demoqa.com/register), POST Account/v1/User
**Severity:** Medium 
**Found during:** Exploratory testing  
**Steps to reproduce:**
1. Open https://demoqa.com/register  
2. Fill in UserName and Password only (leave First Name and Last Name empty)  
3. Attempt to register a new user (click Register button)
**Actual result:**
- UI blocks registration and marks First Name and Last Name as required fields
- Registration cannot proceed without filling these fields
**Expected result:**
- UI validation rules should align with backend requirements  
- Either:
  - First Name and Last Name are required and supported by API, OR  
  - UI should not require these fields if they are not used by backend
**Notes:**
- POST /User endpoint successfully creates users without First Name and Last Name  
- UI collects additional data that is not persisted or returned by backend  
- This creates inconsistency between frontend validation and backend contract