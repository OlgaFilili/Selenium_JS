## Bug-020 !!!Original blank-page symptom is no longer reproducible after a later release. Current post-deletion behavior appears to have changed and is tracked separately.
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

## Bug-031
**Title:** Login page incorrectly renders authenticated state after user deletion
**Environment:** DemoQA Book Store Application (https://demoqa.com)
**Severity:** Medium
**Found during:** UI automation regression testing (end-to-end flow)
**Related test cases:**
- Delete User Account flow check
    regression: Handle of expired token session check
        should check previous token login session closes correctly after account deletion
**Preconditions:**
- User is logged in to the application
- Active user session exists in UI
- Valid access token is issued for the user
**Steps to reproduce:**
1. Log in to the application with a valid user account on https://demoqa.com/login
2. Delete the same user account via API using a valid access token (`DELETE /Account/v1/User/{UUID}`).
3. Refresh the current page in the browser.
4. Observe the state of the profile page.
5. Navigate to Login page using the left-panel menu.
6. Observe the state of the login page.
**Actual result:**
- After refresh, the Profile page correctly displays the message "User not found!".
- Further navigation to the Login page renders the authenticated layout:
    - Message on the login page: "You are already logged in. View your profile."
    - Log Out button is visible
- However, the userName-value element is empty and the user no longer exists.
**Expected result:**
- User session should be invalidated after account deletion.
- Navigating to the Login page should display the unauthenticated state of the page.
- The application should not render authenticated UI elements after the user account has been deleted.
**Notes:**
- Indicates desynchronization between frontend auth state and backend user state.
- Profile page correctly reflects the deleted user state, while the login page still renders authenticated UI elements.
- The behavior suggests that the login page may rely on locally stored authentication state rather than validating the user session after account deletion.
- Attempting to log in again with the deleted user correctly fails.
- Screenshot attached.
