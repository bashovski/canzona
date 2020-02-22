const mongoose = require('mongoose');
const verificationSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true
    }
});
const Verification = mongoose.model('Verification', verificationSchema);
module.exports = Verification;
