const uniqueHash = require('../services/crypt/unique');
const Verification = require('../models/Verification');
const redis = require('../services/redis/redis');

const REQUEST_LIMIT_RATE = 600; // 10 minutes

module.exports = {
    createVerification(userId) {
        return new Promise((resolve, reject) => {
            redis.get(this.verificationRequestRedisKey(userId), (err, lastTimestamp) => {
                if(!lastTimestamp || (Math.floor(new Date / 1000) - parseInt(lastTimestamp)) <= REQUEST_LIMIT_RATE) {
                    this.updateValidationCache(userId);
                    uniqueHash.generateHash(userId, (hash) => {
                        const verification = new Verification({
                            key: hash,
                            user_id: userId
                        });

                        verification.save().then((resp) => {
                            resolve(resp.key);
                        }).catch(err => {
                            reject(err);
                        });
                    });
                }
                else reject(new Error('429 - overexceeded rate limit'));
            });
        });

    },
    deleteUserVerifications(userId) {

    },
    updateValidationCache(userId) {
        return redis.set(this.verificationRequestRedisKey(userId), Math.floor(new Date / 1000));
    },
    verificationRequestRedisKey(userId) {
        return `_verification_request:${userId}`;
    }
};
