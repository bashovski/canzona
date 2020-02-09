const mongoose = require('mongoose');
const songSchema = new mongoose.Schema({
    name: {
        type: String
    },
    author: {
        type: String
    }
});

const Song = mongoose.Model('Song', songSchema);
module.exports = Song;
