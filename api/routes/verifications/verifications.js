const controller = require('../../controllers/VerificationsController');
const router = require('express').Router();

router.route('/resend').post((req, res) => {
    controller.resendVerification(req, res);
});

router.route('/verify').post((req, res) => {
    controller.verifyUser(req, res);
});

module.exports = router;
