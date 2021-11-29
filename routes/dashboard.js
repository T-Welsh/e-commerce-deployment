const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");
require('dotenv').config();

//GET user info
router.get("/user", authorization, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_email, f_name, l_name, address_1, address_2, address_3, county, post_code, telephone, google_id FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

//update user info
router.put("/user", authorization, validInfo,  async (req, res) => {
    try {
        //destructure request body
        const { email, fname, lname, address1, address2, address3, county, postcode, telephone } = req.body;
        const formattedEmail = email.toLowerCase();
        //update recored and send response
        await pool.query("UPDATE users SET user_email = $1, f_name = $2, l_name = $3, address_1 = $4, address_2 = $5, address_3 = $6, county = $7, post_code = $8, telephone = $9 WHERE user_id = $10", [formattedEmail, fname, lname, address1, address2, address3, county, postcode, telephone, req.user])
        .then (res.status(200).json("Account details updated"));
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

//change password
router.put("/user/password", authorization, validInfo, async (req, res) => {
    try {
        //destructure request body
        const { oldPassword, password } = req.body;
        //compare oldPassword against db
        const user = await pool.query("SELECT user_password FROM users WHERE user_id = $1", [req.user]);
        const validPassword = await bcrypt.compare(oldPassword, user.rows[0].user_password);
        if(validPassword === false) {
            return res.status(401).json("Password is incorrect")
        }
        //bcrypt new password
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);
        //update db with new password
        await pool.query("UPDATE users SET user_password = $1 WHERE user_id = $2", [bcryptPassword, req.user])
        .then(res.status(200).json('Password Updated'))
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }

});

module.exports = router;