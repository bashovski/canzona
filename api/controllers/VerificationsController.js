const uniqueHash = require('../services/crypt/unique');
const Verification = require('../models/Verification');

module.exports = {
    createVerification(userId) {
        return new Promise((resolve, reject) => {
            uniqueHash.generateHash(userId, (hash) => {
                const verification = new Verification({
                    key: hash,
                    user_id: userId
                });

                verification.save().then((resp) => {
                    resolve(resp.key);
                }).catch(err => {
                    reject(err)
                });
            });
        });
    },
    deleteUserVerifications(userId) {

    }
};
