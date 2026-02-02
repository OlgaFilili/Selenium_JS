## Bug-020
**Title:** User session is not invalidated in UI after account deletion via API
**Environment:** DemoQA Book Store Application (https://demoqa.com)
**Severity:** High
**Found during:** UI automation regression testing (end-to-end flow)
**Related test cases:**
- Delete User Account flow check
    regression: Handle of expired token session check
        should check previous token login session closes correctly after account deletion
**Preconditions:**
- User is logged in to the application
- Active user session exists in UI
- Valid access token is issued for this user
**Steps to reproduce:**
1. Log in to the application with a valid user account on https://demoqa.com/login
2. Delete the same user account via API using a valid access token (`DELETE /Account/v1/User/{UUID}`).
3. Refresh the current page in the browser.
**Actual result:**
- Application displays a blank page after refresh.
- User is not redirected to the logged-out state.
- Further navigation is impossible from this state.
**Expected result:**
- User session should be invalidated after account deletion.
- User should be redirected to the logged-out state.
- Application should display the login page or a not logged-in profile state.
**Notes:**
- Indicates incorrect session/token invalidation between backend and UI.
- This issue blocks further user interaction and may lead to unstable application state.