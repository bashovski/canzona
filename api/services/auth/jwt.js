const jwt = require('jsonwebtoken');
const fs = require('fs');

const getJWT = () => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    return jwt.sign({}, privateKey, { algorithm: 'HS256'});
};

module.exports = {
    getJWT
};
