const BasePage = require("../BasePage.js");
const MainMenu = require("../../components/MainMenu.js");

class ProfilePage extends BasePage
{
    constructor(driver) {
        super(driver);
        this.menu= new MainMenu(driver);
        //this.mainHeaderTag= "//h1";
        this.formLabel= { id: "notLoggin-label"};
    }
    //_getMainHeaderLocator(){
        //return { xpath: `//div${this.mainHeaderTag}`};
    //}
    async getMessage(){
        const elements= this._finds(this.formLabel);
        const text= await Promise.all(elements.map(el => this._getText(el)));
        return text.join('');
    }
}
module.exports= ProfilePage;