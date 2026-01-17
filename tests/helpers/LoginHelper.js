const LoginPage = require("../../pages/book_store/LoginPage.js");
const ProfilePage = require("../../pages/book_store/ProfilePage.js");

async function loginTestUser(context, user) {
    // Use the user from API
    const loginPage= await new LoginPage(context.driver);
    await loginPage.inputCredentials(user.userName, user.password);
    context.loginPage= loginPage;
}
module.exports = { loginTestUser };