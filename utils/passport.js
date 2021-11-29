const passport = require('passport');
const GoogleStategy = require('passport-google-oauth').OAuth2Strategy;
const pool = require('../db');
require('dotenv').config({path: '../.env'});


// Use the GoogleStrategy within Passport
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
    new GoogleStategy({
        //options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACK_END_ADDRESS}/auth/google/redirect`
    }, async (accessToken, refreshToken, profile, email, done) => {
        try {
            //format user email
            const userEmail = email._json.email.toLowerCase();
            let user;
            //check for user in db
            const existingUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [userEmail]);
            if(existingUser.rowCount === 1){
                user = existingUser.rows[0];
                //if user already registered then update db with google_id
                if(user.google_id === null){
                    user = await pool.query("UPDATE users SET google_id = $1 WHERE user_email = $2 RETURNING *", [email._json.sub, userEmail]);
                }
                return done(null, user);
            }else{
                const { given_name, family_name, sub } = email._json;
                //if user is not found in db the add them using details from google
                const newUser = await pool.query("INSERT INTO users (user_email, f_name, l_name, google_id) VALUES ($1, $2, $3, $4)RETURNING *", [userEmail, given_name, family_name, sub]);
                user = newUser.rows[0];
                return done(null, user);
            }
        } catch (err) {
            console.error(err.message);
        }
    }) 
);