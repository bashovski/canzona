let User = require('../../models/User');
module.exports = (userId, next) => {
    User.findOne({
        _id: userId
    }).select('verified')
    .then(resp => {
        return next(resp.verified);
    }).catch(err => {
        throw err;
    });
};
