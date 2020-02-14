const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (req, res, next) => {
    if (typeof req.headers.authorization === "undefined") {
        res.status(401).json({ error: "Unauthorized" });
    }

    let token = req.headers.authorization;
    let privateKey = fs.readFileSync('./private.pem', 'utf8');

    const controller = require('../../controllers/auth/UsersController.js');
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, data) => {
        console.log(data);
        if(!err || (data && controller.isValidUser(data.user_id, data.email))) return next();

        res.status(401).json({ error: err });
    });
};
