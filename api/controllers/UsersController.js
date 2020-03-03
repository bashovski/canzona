const jwt = require('../services/auth/jwt');
const ses = require('../aws/ses/ses');

const redis = require('../services/redis/redis');
const REQUEST_LIMIT_RATE = 300;

const crypto = require("crypto");

const Recovery = require('../models/Recovery');
const recoveryController = require('../controllers/RecoveriesController');

const bcrypt = require('bcrypt'),
      BCRYPT_SALT_ROUNDS = 10;

const isAuthenticated = require('../services/auth/authenticate');
const isVerified = require('../services/auth/verify');
const verificationsController = require('../controllers/VerificationsController');
const retrieveHolder = require('../services/auth/retrieveHolder');
const updateUserPassword = require('../services/auth/updateUserPassword');

let User = require('../models/User');

module.exports = {

    /**
     * register method handles request by creating a new user with passed params.
     *
     * @param req
     * @param res
     */
    register(req, res) {
        const username = req.body.username,
            email = req.body.email,
            name = req.body.name,
            surname = req.body.surname;

        bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(password => {

                const user = new User({
                    username,
                    email,
                    password,
                    name,
                    surname
                });
                user.save()
                .then(() => {
                    verificationsController.createVerification(user._id).then(verificationKey => {
                        ses.sendVerificationEmail(email, name, verificationKey);
                        res.json({
                            jwtKey: jwt.generateJWT(user._id, email),
                            createdAt: new Date(user.createdAt).getTime() / 1000
                        });
                    }).catch(() => {
                        res.status(429).json({
                            error: 'Request rate limit exceeded'
                        });
                    });
                }).catch(err => {
                    res.status(400).json({
                        error: err
                    });
                });
            });
    },

    /**
     * login method handles request params (email, password) and returns jwt if the credentials are correct.
     *
     * @param req
     * @param res
     */
    login(req, res) {
        const email = req.body.email,
            password = req.body.password,
            step = req.body.step;

        User.findOne({
            email: email
        }).select(`+password`).then(user => {
            if(!user) return res.status(400).send({
                error: 'Entered email doesn\'t match any account.'
            });

            // for the step IDs, refer to auth service in UI
            if(step && step === 1) return res.send({success: true});

            bcrypt.compare(password, user.password, (err, result) => {
                if(result)
                    return res.send({
                        jwtKey: jwt.generateJWT(user._id, email)
                    });
                return res.status(401).json(err);
            });
        }).catch(err => {
            res.status(500).json(err);
        });
    },
    /**
     *
     * authenticate method handles passed authorization bearer.
     *
     * @param req
     * @param res
     */
    async authenticate(req, res) {
        await isAuthenticated(req, res, (userId) => {
            isVerified(userId, (isVerified) => {
                return res.send({
                    success: true,
                    isVerified: isVerified
                });
            })
        });
    },

    recover(req, res) {
        const email = req.body.email;
        User.findOne({
            email: email
        }).then(user => {

            if(!user) return res.status(404).json({
                error: `User doesn't exist`
            });

            const redisKey = recoveryController.recoveryRequestRedisKey(user._id);
            redis.get(redisKey, (err, lastTimestamp) => {

                const now = Math.floor(new Date / 1000);
                if(err || !lastTimestamp || now - parseInt(lastTimestamp) >= REQUEST_LIMIT_RATE) {

                    const key = crypto.randomBytes(256).toString('hex');
                    const recovery = new Recovery({
                        key: key,
                        user_id: user._id
                    });

                    recovery.save()
                    .then(() => {
                        redis.set(redisKey, now);
                        //ses.sendRecoveryEmail(user.email, user.name, key);
                        return res.status(200).json({
                            success: true
                        });
                    });
                } else return res.status(429).json({
                    error: 'Request rate limit exceeded'
                })
            });

        }).catch(err => {
            return res.status(400).json({
                error: err
            });
        });
    },
    concludeAccountRecovery(req, res) {
        const password = req.body.password,
              recoveryId = req.body.recovery_id,
              accessToken = req.headers.authorization;
        recoveryController.isValidRecoveryKey(recoveryId)
        .then(recovery => {
            if(!recovery)
                return res.status(404).json({
                    error: 'Recovery with passed ID not found'
                });

            console.log(recovery.user_id);
            bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(password => {

                User.findOneAndUpdate({
                    _id: recovery.user_id
                }, {
                    password: password
                }, {
                    useFindAndModify: false
                }).then(user => {
                    return res.status(200).json({
                        success: true,
                        user: user
                    });
                });
            }).catch(err => {
                return res.status(500).json({
                    error: err
                });
            });
        });

        /*retrieveHolder(accessToken).then(user => {
            updateUserPassword(user._id, password);
            recoveryController.deleteUserRecoveries(user._id);
            res.status(200).json({
                user: user,
                password: password
            });
        }).catch(err => {
            return res.status(400).json({
                error: err
            });
        });*/
    }
};
