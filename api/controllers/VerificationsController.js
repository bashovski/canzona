const uniqueHash = require('../services/crypt/unique');
const Verification = require('../models/Verification');
const retrieveHolder = require('../services/auth/retrieveHolder');
const ses = require('../aws/ses/ses');
const redis = require('../services/redis/redis');

const REQUEST_LIMIT_RATE = 600; // seconds

module.exports = {
    createVerification(userId) {
        return new Promise((resolve, reject) => {
            redis.get(this.verificationRequestRedisKey(userId), (err, lastTimestamp) => {
                if(!lastTimestamp || (Math.floor(new Date / 1000) - parseInt(lastTimestamp)) >= REQUEST_LIMIT_RATE) {
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
                else reject(new Error('429 - exceeded the rate limit'));
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
    },
    resendVerification(req, res) {
        retrieveHolder(req.headers.authorization)
        .then(data => {
            console.log('retrieve then', data);
            this.createVerification(data._id)
            .then(key => {
                ses.sendVerificationEmail(data.email, data.name, key);
                res.status(200).json({
                    success: true
                });
            }).catch(() => {
                res.status(429).json({
                    error: 'rate limit exceeded'
                })
            })
        }).catch(() => {
            res.status(400).json({
                 error: 'invalid JWT key provided',
            });
        });
    }
};
