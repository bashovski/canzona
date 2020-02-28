const controller = require('../../controllers/ArtistsController');
const router = require('express').Router();

router.route('/create').post((req, res) => {
    controller.createArtist(req, res);
});

router.route('/show/:id').get((req, res) => {
    controller.getArtistById(req, res);
});

router.route('/update/:id').put((req, res) => {
    controller.updateArtist(req, res);
});

router.route('/delete/:id').delete((req, res) => {
    controller.deleteArtist(req, res);
});

module.exports = router;
