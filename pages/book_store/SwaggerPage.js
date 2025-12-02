const BasePage = require("../BasePage.js");
//const MainMenu = require("../../components/MainMenu.js");

class SwaggerPage extends BasePage
{
    constructor(driver) {
        super(driver);
        //this.menu= new MainMenu(driver);
        //this.mainHeaderTag= "//h1";
        //this.loginButton= { id: "login"};
        //this.newUserButton= { id: "newUser"};
    }
}
module.exports= SwaggerPage;