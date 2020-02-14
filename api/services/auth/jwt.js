const jwt = require('jsonwebtoken');
const fs = require('fs');

const generateJWT = (userId = '', email = '') => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    return jwt.sign({
        user_id: userId,
        email: email
    }, privateKey, { algorithm: 'HS256'});
};

module.exports = {
    generateJWT
};
