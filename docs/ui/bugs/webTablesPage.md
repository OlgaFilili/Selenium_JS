## Bug-028
**Title:** Deleting a user-created entry removes all user-created entries and resets pagination
**Environment:** Elements Card menu item (WebTables) on DemoQA (https://demoqa.com/webtables) in Chrome.
**Severity:** Medium
**Found during:** UI automation regression testing
**Related test cases:**
- Web Tables Page functionality check
       regression: Basic functionality check
         regression: Deletion with added entries
           should check entries amount after a deletion
- Web Tables Page functionality check
       regression: Pagination bottom menu check
         should check pagination info after deletion
**Steps to reproduce:**
1. Open https://demoqa.com/webtables
2. Add two or more custom (user-created) entries
3. Delete one of the user-created entries
4. Observe the table and pagination state
**Actual result:**
All user-created rows are removed from the table
Table resets to default entries only
Pagination resets to a single page (1 of 1)
**Expected result:**
Only the selected row is removed
Remaining user-created rows stay visible
Pagination updates correctly based on remaining rows
**Notes:**
- When any row is deleted after user-created entries exist, all user-created rows are removed.
- Deleting a default row removes that default row correctly, but also clears all user-created rows.
- If the table previously had multiple pages, deletion also resets pagination to a default (single) page.
