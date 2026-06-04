const userFields = {
        FIRST_NAME: 'firstname',
        LAST_NAME: 'lastname',
        USER_NAME: 'userName',
        PASSWORD: 'password'
};
function newUser(fn, ln, un, psswd) {
    return { 
        [userFields.FIRST_NAME]: fn,
        [userFields.LAST_NAME]: ln,
        [userFields.USER_NAME]: un,
        [userFields.PASSWORD]: psswd
    };
}
const invalidPasswords = Object.freeze([
    { value: 'i2345678!', reason: 'no uppercase'},
    { value: 'P!!!!!!!d', reason: 'no digit'},
    { value: 'Password1', reason: 'no symbol'},
    { value: 'PASSWORD1!', reason: 'no lowercase'},
    { value: 'Psswd!1', reason: 'less than 8 chars'}
]);
function generateValidUser() {
    const now = new Date().toISOString().replace(/[:.]/g, '-');
    return newUser(`First_name_${now}`, `Last_name_${now}`, `Test_user_${now}`, `Psswd123!_${now}`);
}
function generateUserWithInvalidField(field, value) {
    const user = generateValidUser();
    user[field] = value;
    return user;
}
function _extendToLength(base, targetLength, char) {
    if (base.length >= targetLength) 
        return base.slice(0, targetLength);
    return base + char.repeat(targetLength - base.length);
}
function generateUserWithOverrides(overrides, char = 'a') {
    const user = generateValidUser();
    for (const [field, value] of Object.entries(overrides)) {
        if (typeof value === 'number') {
            user[field] = _extendToLength(user[field], value, char);
        } 
        else if (typeof value === 'string') {
            user[field] = value;
        } 
        else {
            throw new Error(`Unsupported override type for field "${field}"`);
        }
    }
    return user;
}
const extremeUsersPositive = Object.freeze([ 
    { user: generateUserWithOverrides({
        [userFields.FIRST_NAME]: 42,
        [userFields.LAST_NAME]: 42,
        [userFields.USER_NAME]: 42,
        [userFields.PASSWORD]: 42}), overview: 'boundary values for all fields' },
    { user: generateUserWithOverrides({[userFields.FIRST_NAME]: ' ', [userFields.LAST_NAME]: '  '}), overview: 'only spaces in fisrt/last names'},
    { user: generateUserWithOverrides({[userFields.USER_NAME]: 37, [userFields.PASSWORD]: 37}, 'А'), overview: 'non-ASCII chars in credentials'},
    { user: generateUserWithInvalidField(userFields.USER_NAME, '\"; DROP TABLE --'), overview: 'destructive SQL payload in username'}
]);
const extremeUsersNegative = Object.freeze([
    { user: generateUserWithOverrides({
        [userFields.USER_NAME]: 43,
        [userFields.PASSWORD]: 43}), overview: 'too long credentials'},
    //validation missing entries
    { user: generateUserWithInvalidField(userFields.USER_NAME, '   '), overview: 'only whitespaces in username'},
    { user: generateUserWithInvalidField(userFields.PASSWORD, '        '), overview: 'only whitespaces in password'},
    { user: generateUserWithInvalidField(userFields.PASSWORD, 'Pass word1!'), overview: 'internal whitespace in password'}
]);
// Known issue Bug-033
// First Name and Last Name are required in UI,
// but not supported by API (not stored / not validated).
// There are no tests in suites for this area
const nameEdgeCases = Object.freeze([
    { value: '    Name', type: 'leading spaces'},
    { value: 'Name    ', type: 'trailing spaces'},
    { value: 'Имя', type: 'non-ASCII'},
    { value: '', type: 'empty'},
    { value: 'OR 10=10 --', type: 'sql-like'},
    { value: '@#$%^&*()+=-`~[ ]{};":,./<>?!', type: 'symbols only'}
]);

module.exports = { generateValidUser, generateUserWithInvalidField, generateUserWithOverrides, newUser, userFields, invalidPasswords, extremeUsersPositive, extremeUsersNegative };