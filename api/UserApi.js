const axios = require('axios');

const BASE_URL = 'https://demoqa.com';
class UserApi {
    _generateUser() {
        const now = new Date().toISOString().replace(/[:.]/g, '-');
        return {
            userName: `test_user_${now}`,
            password: 'Test123!'
        };
    }
    async createUser() {
        const user = this._generateUser();
        const response = await axios.post(`${BASE_URL}/Account/v1/User`, user);
        user.userId = response.data.userID;
        return user;
    }
    async deleteUser(user) {
        // 1. Generate token
        const tokenResponse = await axios.post(`${BASE_URL}/Account/v1/GenerateToken`,
            {   userName: user.userName,
                password: user.password});
        const token = tokenResponse.data.token;
        // 2. Delete user
        await axios.delete(`${BASE_URL}/Account/v1/User/${user.userId}`,
            {headers: {Authorization: `Bearer ${token}`}});
    }
}
module.exports = new UserApi();