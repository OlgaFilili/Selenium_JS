const HomePage = require("../pages/HomePage.js");
const FormsPage= require ("../pages/FormsPage.js");
const AutomationPracticeFormPage= require("../pages/forms/AutomationPracticeFormPage.js");
const WidgetsPage = require("../pages/WidgetsPage.js");
const BooksPage= require ("../pages/book_store/BooksPage.js");
const { expect }= require('chai');

describe('Main Menu responsive behavior check', function(){
    const mainMenuNames=['Elements', 'Forms', 'Alerts, Frame & Windows', 'Widgets', 'Interactions', 'Book Store Application'];
    const elementsMenuItems=['Text Box', 'Radio Button', 'Check box', 'Web Tables'];
    const formsMenuItem='Practice Form';
    const aFWMenuItems=['Browser Windows', 'Alerts', 'Frames', 'Nested Frames', 'Modal Dialogs'];
    const widgetsMenuItems=['Accordian', 'Auto Complete', 'Date Picker', 'Slider', 'Progress Bar', 'Tabs', 'Tultips', 'Menu', 'Select Menu'];
    const interactionsMenuItems=['Sortable', 'Selectable', 'Resizable', 'Droppable', 'Dragabble'];
    const bookAppMenuItems=['Login', 'Book Store', 'Profile', 'Book Store API'];
    const expectedMessage="Please select an item from left to start practice.";
    /** @type {HomePage} */
    let homePage, anyPage;
    beforeEach(async function(){
        await this.driver.manage().window().setRect({ width: 400, height: 800 });
        homePage = this.homePage;
        await homePage.waitCardsVisible();
    });
    describe('smoke: Navigation Bar button functionality check', function(){
        it('should check Navigation Bar button is displayed', async function(){
            anyPage= await homePage.gotoWidgets();
            await anyPage.menu.waitMenuVisible(mainMenuNames[3]);
            const isVisible= await anyPage.menu.isNavBarVisible();
            expect(isVisible, "Navigation Bar button is not displayed").to.be.true;
        });
        it('should check Navigation Bar button collapses Main Menu left panel', async function(){
            //Known issue: Bug-029
            anyPage= await homePage.gotoElements();
            await anyPage.menu.waitMenuVisible(mainMenuNames[0]);
            await anyPage.menu.waitNavBarButton();
            await anyPage.menu.clickNavBarButton();
            await anyPage.menu.waitMenuRemoved();
            const isExpanded= await anyPage.menu.isNavBarExpanded();
            expect(isExpanded, "Main Menu is displayed and expanded").to.be.false;
            const actualPageMessage=await anyPage.getElementsPageText();
            expect(actualPageMessage, `Actual and expected text on the ${mainMenuNames[0]} page do not match`).to.be.equal(expectedMessage);
        });
        it.skip('should check Navigation Bar button expands Main Menu left panel in state it was collapsed before', async function(){
            //Known issue: Bug-029
            //Test skipped for the CI stability
            anyPage= await homePage.gotoWidgets();
            await anyPage.menu.waitMenuVisible(mainMenuNames[3]);
            const datePickerPage= await anyPage.gotoDatePickerMenuItem();
            await datePickerPage.menu.waitNavBarButton();
            await datePickerPage.menu.clickNavBarButton();
            await datePickerPage.menu.waitMenuRemoved();
            await datePickerPage.menu.clickNavBarButton();
            const isExpanded= await datePickerPage.menu.isMenuExpanded(mainMenuNames[3]);
            expect(isExpanded, `${mainMenuNames[3]} is not expanded`).to.be.true;
            const isActive= await datePickerPage.menu.isSubMenuItemActive(widgetsMenuItems[2]);
            expect(isActive, `${widgetsMenuItems[2]} sub-menu is not active`).to.be.true;
        });
    });
    describe('regression: Book Store page behavior checks', function(){
        it('should automatically scroll to the top of the page when opening Book Store Application from Home page', async function(){
            anyPage= await homePage.gotoBookStoreApplication();
            await anyPage.waitLoginButton();
            const isVisible= await anyPage.isLoginButtonVisible();
            expect(isVisible, "The Book Store page is not automated scrolled to the top of the page redirecting from Home page").to.be.true;
        });
    });
    describe('regression: Main Menu checks after maximizing window', function(){
        it('should check Navigation Bar button disappears and MainMenu keeps its state', async function(){
            anyPage= await homePage.gotoAlertsFrameWindows();
            await anyPage.menu.waitMenuVisible(mainMenuNames[2]);
            const browserWindowsPage= await anyPage.gotoBrowserWindowsMenuItem();
            await browserWindowsPage.menu.waitNavBarButton();
            await this.driver.manage().window().maximize();
            const isVisible= await anyPage.menu.isNavBarVisible();
            expect(isVisible, "Navigation Bar button is displayed").to.be.false;
            let isExpanded= await anyPage.menu.isNavBarExpanded();
            expect(isExpanded, "Main Menu is not displayed").to.be.true;
            isExpanded= await anyPage.menu.isMenuExpanded(mainMenuNames[2]);
            expect(isExpanded, `${mainMenuNames[2]} menu is not expanded`).to.be.true;
            const isActive= await anyPage.menu.isSubMenuItemActive(aFWMenuItems[0]);
            expect(isActive, `${aFWMenuItems[0]} sub-menu is not active`).to.be.true;
        });
        it('should display Main Menu when opening Book Store Application from Home page', async function(){
            //Known issue: Bug-030
            anyPage= await homePage.gotoBookStoreApplication();
            await anyPage.waitLoginButton();
            await anyPage.menu.waitNavBarButton();
            await anyPage.menu.scrollToTheHead();
            await this.driver.manage().window().maximize();
            const isVisible= await anyPage.menu.isNavBarVisible();
            expect(isVisible, "Navigation Bar button is displayed").to.be.false;
            const isExpanded= await anyPage.menu.isNavBarExpanded();
            expect(isExpanded, "Main Menu is not displayed on Book Store page after redirecting from Home page and maximizing window").to.be.true;
        });
    });
});