const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        //destructure token from request header
        //const jwtToken = req.cookies.token;
        const jwtToken = req.headers.token;
        // set user login status for cart path
        if(req.originalUrl === "/cart"){
            if(jwtToken === 'no_token'){
                req.loggedIn = false;
                return next();
            }
        }
         //check token exists
        if(jwtToken === 'no_token'){
            return res.status(403).json("Not Authorized")
        }
        //check token is valid
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        //attach validated token to req
        req.user = payload.user
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorised");
    }
}