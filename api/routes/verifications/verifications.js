const controller = require('../../controllers/VerificationsController');
const router = require('express').Router();

router.route('/resend').post((req, res) => {
    controller.resendVerification(req, res);
});

module.exports = router;
