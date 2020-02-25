const Artist = require('../models/Artist');

module.exports = {
    getArtistById(req, res) {
        const id = req.body.id;
        Artist.findById(id, (err, artist) => {
            return artist ? artist : err;
        });
    },
    createArtist(req, res) {
        const artist = new Artist({
            name: req.body.name,
            isGroup: req.body.isGroup ? req.body.isGroup : false,
            formed: req.body.formed,
            avatar: req.body.avatar,
            background: req.body.background,
            about: !req.body.about.toString().length ? req.body.about : 'No info added.',
            gallery: req.body.gallery
        });

        artist.save()
        .then(resp => {
            console.log(resp);
            res.status(200).json(resp);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateArtist(req, res) {
        console.log(req);
    },
    deleteArtist(req, res) {
        console.log(req);
    }
};
