const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        //destructure token from request header
        const jwtToken = req.cookies.token;
        //check token exists
        if(!jwtToken){
            return res.status(403).json("Not Authorized")
        }
        //check token is valid
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        //attach validated token to req
        req.user = payload.user
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorised");
    }
    next();
}