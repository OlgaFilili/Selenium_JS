## Bug-018
**Title:** BooksTable pagination shows incorrect current page after changing rows per page
**Environment:** DemoQA Book Store Application (https://demoqa.com/books) in Chrome.
**Severity:** Low
**Found during:** UI automation regression testing
**Related test cases:**
- BooksTable component functionality check
       Books Table component check, not logged-in state
         regression: Pagination bottom menu check
           should display corresponding number of pages and current page after switching to bigger amount
**Steps to reproduce:**
1. Open DemoQA Book Store page (https://demoqa.com/books)
2. Ensure that books amount more than 5. Pagination shows "10 rows" on the page
3. Choose from the dropdown to show 5 rows on the page
4. Press the Next button to navigate to the next page
5. Ensure that pagination shows correct page number and right amount of pages ('Page 2 of 2').
6. Choose from the dropdown to show 10 rows on the page
7. Compare the pagination state with the expected result
**Actual result:**
Pagination shows 'Page 2 of 1'
**Expected result:**
Pagination shows 'Page 1 of 1'
**Notes:**
- Pagination should show the correct page number in case of enlarging the amount of the rows on the page.
- Current page number can not be more than all pages amount.

## Bug-019
**Title:** BooksTable component displays incorrect images after search and pagination
**Environment:** DemoQA Book Store Application (https://demoqa.com/books) in Chrome
**Severity:** Medium
**Found during:** UI automation regression testing
**Related test cases:**
- BooksTable component functionality check
       Books Table component check, not logged-in state
         regression: Live search functionality check
           should check the correctness image for each book after search
- BooksTable component functionality check
       Books Table component check, not logged-in state
         regression: Live search functionality check
           should check the correctness of images for books after searching results displayed on more than one page
**Steps to reproduce:**
1. Open DemoQA Book Store page (https://demoqa.com/books)

Scenario A: Search single page:
2. Perform search with text "des"
3. Observe the image displayed for each book in the search result

Scenario B: Search with pagination:
4. Set rows per page to '5 rows'
5. Perform search with text "er"
6. Press the Next button to navigate to the next page
7. Observe the image displayed for each book on the page
**Actual result:**
Images for books do not correspond to the correct entries. They remain “stuck” to the previous row positions.
**Expected result:**
Each book displays its correct image according to the book title and author, regardless of search or pagination.
**Notes:**
- This issue affects both search results and pagination flows.
- Root cause seems to be in the BooksTable component rendering logic; image elements are not updated correctly when table rows change.