const controller = require('../../controllers/auth/UsersController');
const router = require('express').Router();

let User = require('../../models/user.model');

/**
 * Endpoint for index list of all registered users.
 */
router.route('/').get((req, res) => {
    controller.indexUsers(req, res);
});

/**
 * Endpoint for registering the user.
 */
router.route('/register').post((req, res) => {
    controller.register(req, res);
});

router.route('/login').post((req, res) => {
    controller.login(req, res);
});

router.route('/session').get((req, res) => {
    controller.authenticate(req, res);
})

module.exports = router;
