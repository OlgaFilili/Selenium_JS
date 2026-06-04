## Bug-034
**Title:** Error message disappears immediately due to unexpected page refresh on RegisterPage
**Environment:** DemoQA Book Store Register Page (https://demoqa.com/register) in Chrome.
**Severity:** Medium
**Found during:** UI automation smoke testing
**Related test cases:**
- Register Page UI check
       smoke: Basic UI check
         should show error message for invalid password
**Steps to reproduce:**
1. Open https://demoqa.com/register
2. Fill in all fields with invalid password value
3. Click `Register` button
4. Observe the error message behavior
**Actual result:**
- Error message appears briefly and disappears almost immediately  
- Page refreshes automatically without user interaction  
- User cannot properly read or interact with the message 
**Expected result:**
- Error message remains visible until user interaction  
- Page should not refresh automatically after validation failure  
**Notes:**
- Issue occurs for all types of validation messages (invalid password, existing user, captcha, etc.)  
- Likely related to incorrect UI state handling or unintended page reload  
- Makes both manual testing and automated validation unreliable
