const RegisterPage = require("../../pages/book_store/RegisterPage.js");
const { waitForDomStable } = require("../../utils/WaitUtils.js");

async function registerNewUser(driver, user) {
    // Use data for a new user from RegisterData
    const registerPage= await new RegisterPage(driver);
    await registerPage.inputUserInfo(user);
    await registerPage.clickRegisterButton();
    await waitForDomStable(driver);
}
module.exports = { registerNewUser };