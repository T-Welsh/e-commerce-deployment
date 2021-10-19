const router = require("express").Router();
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization")

//register user
router.post("/register", validInfo, async (req, res) => {
    try {
        //destructure req.body
        const {  email, password, fname, lname, address1, address2, address3, county, postcode, telephone } = req.body;
        const formattedEmail = email.toLowerCase();
        //check if user exists
        const user = await pool.query("SELECT 8 FROM users WHERE user_email = $1", [formattedEmail]);
        if(user.rowCount > 0){
            return res.status(401).send("Email already registered")
        }
        //Bcrypt users password
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);
        //add new user to database
        const newUser = await pool.query("INSERT INTO users (user_email, user_password, f_name, l_name, address_1, address_2, address_3, county, post_code, telephone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [formattedEmail, bcryptPassword, fname, lname, address1, address2, address3, county, postcode, telephone]);
        //generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
//login route
router.post("/login", validInfo, async (req, res) => {
try {
    //destructure req.body
    const { email, password} = req.body;
    const formattedEmail = email.toLowerCase();
    //retrieve user from database
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [formattedEmail]);
    if(user.rowCount !== 1) {
        return res.status(401).json("Password or Email is incorrect");
    }
    //check password matches
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
    if(validPassword === false) {
        return res.status(401).json("Password or Email is incorrect")
    }
    //issue jwt token
    const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });
} catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
}
});
//verify token
router.get("/is-verify", authorization, async(req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;