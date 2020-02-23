const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const fs = require('fs');

module.exports = (token) => {
    return new Promise((resolve, reject) => {
        const privateKey = fs.readFileSync('./private.pem', 'utf8');

        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, data) => {
            if(!err) {
                User.findOne({
                    _id: data.user_id
                }).select()
                .then(data => {
                    if(!data.name) reject(new Error('account with passed credentials doesn\'t exist'));
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                });
            }
            else {
                console.log(err);
                reject(err);
            }
        });
    });
};
