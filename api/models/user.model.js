const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
       type: String,
       required: true,
       unique: true,
       trim: true,
       minLength: 4,
       maxLength: 24
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 128,
        validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 8,
        maxLength: 32
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
