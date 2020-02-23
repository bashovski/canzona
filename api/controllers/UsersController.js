const jwt = require('../services/auth/jwt');
const ses = require('../aws/ses/ses');

const bcrypt = require('bcrypt'),
      BCRYPT_SALT_ROUNDS = 10;

const isAuthenticated = require('../services/auth/authenticate');
const isVerified = require('../services/auth/verify');
const verificationsController = require('../controllers/VerificationsController');

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
     * @param next
     */
    async authenticate(req, res, next = () => {}) {
        await isAuthenticated(req, res, (userId) => {
            isVerified(userId, (isVerified) => {
                return res.send({
                    success: true,
                    isVerified: isVerified
                });
            })
        });
    }
};