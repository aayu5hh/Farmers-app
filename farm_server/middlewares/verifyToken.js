require('dotenv').config();

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {


    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
        if(err){
            res.status(401).json({ message: "Authentication failed" });
        }
        if(tokenData) {
            req.body.tokenData = tokenData;
            next();
        }
    });

    next();
};

module.exports = verifyToken;
