const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;

module.exports = {
    generateHash(salt, next) {
        const timestamp = Math.floor(Date.now() / 1000);
        bcrypt.hash(timestamp + salt, BCRYPT_SALT_ROUNDS)
        .then(hash => {
            return next(hash);
        }).catch(() => {
            return false;
        })
    }
}
