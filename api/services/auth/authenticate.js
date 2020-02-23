const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (req, res, next) => {
    if (typeof req.headers.authorization === "undefined") {
        res.status(401).json({ error: "Unauthorized" });
    }

    const token = req.headers.authorization;
    const privateKey = fs.readFileSync('./private.pem', 'utf8');

    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, data) => {
        if(!err) return next(data.user_id);
        res.status(401).json({ error: err });
    });
};
