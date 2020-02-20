const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;

module.exports = {
    // This method accepts all types of hashes, but should be used for hashing public files.
    generateHash(salt, next) {
        const timestamp = Math.floor(Date.now() / 1000);
        bcrypt.hash(timestamp + salt, BCRYPT_SALT_ROUNDS)
        .then(hash => {
            console.log(hash);
            return next(hash);
        }).catch(() => {
            return false;
        })
    }
}
