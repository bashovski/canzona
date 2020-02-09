const router = require('express').Router(),
    bcrypt = require('bcrypt');
    BCRYPT_SALT_ROUNDS = 10;

let User = require('../../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.send(users))
        .catch(err => res.status(400).json(err));
});

/**
 * Handler for registering the user by adding a new document record to the MongoDB cluster's collection.
 */
router.route('/post').post((req, res) => {
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
                res.json('user added');
            }).catch(err => {
            res.status(400).json(err);
        });
    });
});

module.exports = router;
