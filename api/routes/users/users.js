const router = require('express').Router();
let User = require('../../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.send(users))
        .catch(err => res.status(400).json(err));
});

router.route('/post').post((req, res) => {
    const username = req.body.username,
        email = req.body.email,
        password = req.body.password;

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

module.exports = router;
