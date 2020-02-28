const mongoose = require('mongoose');
const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1,
        maxLength: 128,
        validate: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    formed: {
        type: Object,
        default: {}
    },
    avatar: {
        type: String,
        required: false,
        trim: true
    },
    background: {
        type: String,
        required: false,
        trim: true
    },
    albums: {
        type: Array,
        default: []
    },
    monthlyListeners: {
        type: Number,
        default: 0
    },
    about: {
        type: String,
        default: 'No info added.'
    },
    gallery: {
        type: Array,
        default: []
    }
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
