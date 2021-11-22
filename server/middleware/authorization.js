const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {

    const jwtToken = req.headers.token;

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, verifiedJwt) => {
        if (err){
            if(req.originalUrl === "/cart"){
                req.loggedIn = false;
                next();
            }else{
                console.error(err.message);
                res.status(403).json("Not Authorised");
            }
        }else{
            req.user = verifiedJwt.user;
            next();
        }
    });
}