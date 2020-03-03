const User = require('../../models/User');
const bcrypt = require('bcrypt'),
    BCRYPT_SALT_ROUNDS = 10;
module.exports = (userId, pw) => {
    bcrypt.hash(pw, BCRYPT_SALT_ROUNDS)
    .then(password => {
        const query = {
            _id: userId
        }, update = {
            password: password
        }, options = {
            useFindAndModify: false
        };
        User.findOneAndUpdate(query, update, options).then(() => {
            return true;
        }).catch(() => {
            return false;
        });
    }).catch(() => {
        return false;
    })

};
