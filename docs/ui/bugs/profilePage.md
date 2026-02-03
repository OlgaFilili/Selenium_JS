## Bug-021
**Title:** Label "Books:" wraps into two lines on Profile page after login
**Environment:** DemoQA Book Store Application (https://demoqa.com/profile) in Chrome (@144)
**Severity:** Low
**Found during:** UI exploratory testing
**Related test cases:**
**Steps to reproduce:**
1. Open DemoQA Book Store (https://demoqa.com/profile)
2. Log in with any valid user
3. Observe the label "Books:"
**Actual result:**
Label "Books :" is split into two lines, with the colon rendered on a separate line. Both parts are displayed to the left of the Live Search field.
**Expected result:**
Label "Books :" is displayed on a single line and remains visually consistent with other labels on the page.
**Notes:**
- This issue affects only the visual layout and does not impact functionality.
- The space between "Books" and ":" may contribute to the line break.
- Screenshot attached.