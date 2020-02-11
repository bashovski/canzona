const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (req, res, next) => {
    if (typeof req.headers.authorization === "undefined") {
        res.status(401).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }

    let token = req.headers.authorization.split(" ")[1];
    let privateKey = fs.readFileSync('./private.pem', 'utf8');

    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
        if (err) {
            res.status(500).json({ error: "Not Authorized" });
            throw new Error("Not Authorized");
        }
        return next();
    });
};
