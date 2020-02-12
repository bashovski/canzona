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
     * createUser method handles request by creating a new user with passed params.
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
                        jwtKey: jwt.getJWT()
                    });
                }).catch(err => {
                    res.status(400).json(err);
                });
            });
    },
    login(req, res) {
        const email = req.body.email,
            password = req.body.password;

        User.findOne({
            email: email
        }).select(`+password`).then(user => {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result)
                    return res.send({
                        jwtKey: jwt.getJWT()
                    });
                return res.status(401).json(err);
            });
        }).catch(err => {
            res.status(500).json(err);
        });
    },
    authenticate(req, res, next = () => {}) {
        isAuthenticated(req, res, () => {
            return res.send({
                success: true
            });
        });
    }
};
