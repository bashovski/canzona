const controller = require('../../controllers/UsersController');
const router = require('express').Router();

router.route('/register').post((req, res) => {
    controller.register(req, res);
});

router.route('/login').post((req, res) => {
    controller.login(req, res);
});

router.route('/authenticate').get((req, res) => {
    controller.authenticate(req, res);
});

module.exports = router;
