const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (req, res, next) => {
    if (typeof req.headers.authorization === "undefined") {
        res.status(401).json({ error: "Unauthorized" });
        throw new Error("Unauthorized");
    }

    let token = req.headers.authorization;
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
        if (err) {
            res.status(401).json({ error: err });
            throw new Error("Unauthorized");
        }
        next()
    });
};
