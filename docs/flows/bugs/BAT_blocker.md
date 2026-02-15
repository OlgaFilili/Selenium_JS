## Bug-028
**Title:** ProfilePage → Login/Register redirection blocked due to missing build artifact
**Environment:** DemoQA Book Store Application (https://demoqa.com)
**Severity:** Blocker
**Found during:** ProfilePage → Login/Register redirection blocked due to missing build artifact
**Preconditions:**
- ProfilePage is in non-authenticated state (if any user is logged in the Book Store, make logged out first)
**Steps to reproduce:**
1. Open DemoQA Book Store (https://demoqa.com/profile).
2. Click the "register" link or "login" link on the ProfilePage.
**Actual result:**
- Page fails to load, error message displayed:
`Error: ENOENT: no such file or directory, stat '/usr/projects/demosite-new/public/index.html'`.
- Navigation and user flow are blocked
**Expected result:**
- Page loads correctly  
- User can access RegisterPage or LoginPage from ProfilePage
**Notes:**
- This is an environment/deployment issue, not a functional bug.
- Indicates missing frontend build artifact / deployment issue.
- Blocks smoke and regression testing.  
- Automated UI tests for these flows should be skipped or blocked until the build issue is resolved.  
- RegisterPage is still accessible via the "New User" button on the LoginPage.  
- Screenshot can be attached for demonstration.