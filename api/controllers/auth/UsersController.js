const jwt = require('../../services/auth/jwt');
const bcrypt = require('bcrypt'),
      BCRYPT_SALT_ROUNDS = 10;

const isAuthenticated = require('../../services/auth/isAuthenticated');

let User = require('../../models/user.model');

module.exports = {

    /**
     * indexUsers method returns list of all users as response from the MongoDB collection of users.
     *
     * @param req
     * @param res
     */
    indexUsers(req, res) {
        User.find()
            .then(users => res.send(users))
            .catch(err => res.status(400).json(err));
    },


    /**
     * register method handles request by creating a new user with passed params.
     *
     * @param req
     * @param res
     */
    register(req, res) {
        const username = req.body.username,
            email = req.body.email;

        bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(password => {

                const user = new User({
                    username,
                    email,
                    password
                });

                user.save()
                .then(() => {
                    res.json({
                        jwtKey: jwt.generateJWT(user._id, email)
                    });
                }).catch(err => {
                    res.status(400).json(err);
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
    authenticate(req, res, next = () => {}) {
        isAuthenticated(req, res, () => {
            return res.send({
                success: true
            });
        });
    },

    isValidUser(userId, email) {
        User.findOne({
            email: email,
            user_id: userId
        }).then(resp => {
            return true;
        }).catch(() => {
            return false;
        });
    }
};
