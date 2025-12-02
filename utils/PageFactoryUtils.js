const BrowserWindowsPage = require("../pages/alerts/BrowserWindowsPage.js");
const DatePickerPage = require("../pages/widgets/DatePickerPage.js");
const SortablePage = require("../pages/interactions/SortablePage.js");
const DroppablePage = require("../pages/interactions/DroppablePage.js");

function getPageByMenuItem(driver, itemName) {
    switch (itemName) {
        case "Browser Windows": return new BrowserWindowsPage(driver);
        case "Date Picker": return new DatePickerPage(driver);
        case "Sortable": return new SortablePage(driver);
        case "Droppable": return new DroppablePage(driver);
        default: throw new Error(`Unknown menu item: ${itemName}`);
    }
}
module.exports={ getPageByMenuItem };