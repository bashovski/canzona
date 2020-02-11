const controller = require('../../controllers/UsersController');
const router = require('express').Router();

let User = require('../../models/user.model');

router.route('/').get((req, res) => {
    controller.indexUsers(req, res);
});

/**
 * Handler for registering the user by adding a new document record to the MongoDB cluster's collection.
 */
router.route('/post').post((req, res) => {
    controller.createUser(req, res);
});

module.exports = router;
