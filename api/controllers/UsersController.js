const jwt = require('jsonwebtoken');
const fs = require('fs');


const bcrypt = require('bcrypt');
BCRYPT_SALT_ROUNDS = 10;

let User = require('../models/user.model');

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
     * createUser method handles request by creating new user with passed params.
     *
     * @param req
     * @param res
     */
    createUser(req, res) {
        const username = req.body.username,
            email = req.body.email;

        bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(password => {

                const user = new User({
                    username,
                    email,
                    password
                });

                let privateKey = fs.readFileSync('./private.pem', 'utf8');
                let token = jwt.sign({ "body": "stuff" }, "__pass_phrase", { algorithm: 'HS256'});

                user.save()
                    .then(() => {
                        res.json({
                            jwtKey: token
                        });
                    }).catch(err => {
                    res.status(400).json(err);
                });
            });
    },
};
