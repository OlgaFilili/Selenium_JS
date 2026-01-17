const axios = require('axios');

const BASE_URL = 'https://demoqa.com';

class UserApi {
    _generateUser() {
        return {
            userName: `test_user_${Date.now()}`,
            password: 'Test123!'
        };
    }
    async createUser() {
        const user = this._generateUser();
        await axios.post(
            `${BASE_URL}/Account/v1/User`,
            user
        );
        return user;
    }
}
module.exports = new UserApi();