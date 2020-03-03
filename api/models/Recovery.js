const mongoose = require('mongoose');
const recoverySchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const Recovery = mongoose.model('Recovery', recoverySchema);
module.exports = Recovery;
