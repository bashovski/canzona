const crypto = require("crypto");
const Verification = require('../models/Verification');
const User = require('../models/User');
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

                    const key = crypto.randomBytes(64).toString('hex');
                    const verification = new Verification({
                        key: key,
                        user_id: userId
                    });

                    verification.save().then((resp) => {
                        resolve(resp.key);
                    }).catch(err => {
                        reject(err);
                    });
                }
                else reject(new Error('429 - exceeded the rate limit'));
            });
        });

    },
    deleteUserVerifications(userId) {
        Verification.deleteMany({
            user_id: userId
        }).then(resp => {
            return true;
        }).catch(err => {
            return false;
        });
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
                //ses.sendVerificationEmail(data.email, data.name, key);
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
    },
    verifyUser(req, res) {
        const verificationKey = req.body.key;

        Verification.findOne({
            key: verificationKey
        }).select()
        .then(verification => {

            this.deleteUserVerifications(verification.user_id);

            // update args
            const query = {
                _id: verification.user_id
            };

            const update = {
                verified: true
            };

            const options = {
                useFindAndModify: false
            };

            User.findOneAndUpdate(query, update, options)
            .then(() => {
                res.json({
                    success: true
                });
            });
        }).catch(err => {
            res.status(400).json(err);
        });
    }
};
