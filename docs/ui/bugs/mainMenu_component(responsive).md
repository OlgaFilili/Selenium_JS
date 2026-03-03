## Bug-029
**Title:** Navigation (hamburger) button in responsive mode render the page blank after toggle
**Environment:** Elements Card menu on DemoQA (https://demoqa.com/elements) in Chrome.
**Severity:** High
**Found during:** UI automation smoke responsive testing
**Related test cases:**
- Main Menu responsive behavior check
       smoke: Navigation Bar button functionality check
         should check Navigation Bar button collapses Main Menu left panel
- Main Menu responsive behavior check
       smoke: Navigation Bar button functionality check
         should check Navigation Bar button expands Main Menu left panel in state it was collapsed before
**Steps to reproduce:**
1. Resize the browser window to a narrow width so the Navigation (hamburger) button appears
2. Open https://demoqa.com/elements and confirm the page content and the left Main Menu are visible 
3. Click the Navigation (hamburger) button
**Actual result:**
Page becomes blank: the left Main Menu, the hamburger button, and the page content are not visible
**Expected result:**
Left Main Menu collapses, but the hamburger button and the page content remain visible
**Notes:**
- Same behavior occurs on other DemoQA pages (card pages and inner pages), not only Elements.
- Reloading the page or returning to the home page restores navigation.
- Screenshot attached.
- Console error observed on click: Uncaught TypeError: findDOMNode is not a function; app root becomes empty (#root has no content).

## Bug-030
**Title:** After resizing from responsive view to maximized view, the Book Store page loses all navigation controls
**Environment:** Book Store on DemoQA (https://demoqa.com/books) in Chrome.
**Severity:** Medium
**Found during:** UI automation regression responsive testing
**Related test cases:**
- Main Menu responsive behavior check
       regression: Main Menu checks after maximizing window
         should display Main Menu when opening Book Store Application from Home page
**Steps to reproduce:**
1. Resize the browser window to a narrow width so the Navigation (hamburger) button appears
2. Open https://demoqa.com/books and confirm the Books page content is visible
3. Maximize the browser window (return to wide view)
**Actual result:**
Page content remains visible; however, neither the Main Menu nor the hamburger button is visible, leaving no navigation options available
**Expected result:**
Page content is visible
After maximizing, either the Main Menu becomes visible again or the hamburger button remains available (navigation should not disappear)
**Notes:**
- This significantly impacts usability (user can get “stuck”).
- Reloading the page or returning to the home page restores navigation.
- Screenshot attached.
- No console errors observed; issue appears to be UI state/visibility after resize.