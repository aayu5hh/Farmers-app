require('dotenv').config();

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;
    console.log(token);

    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
        if(err){
            return res.status(400).json({ message: "Authentication failed" });
        }
        if(tokenData) {
            req.body.tokenData = tokenData;
            next();
        }
    });

    next();
};

module.exports = verifyToken;
