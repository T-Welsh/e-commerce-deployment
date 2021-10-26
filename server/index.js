const express = require('express');
const app = express();
const cors = require('cors');
const passportSetup = require('./utils/passport');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

//set root directory for referencing static files 
app.use(express.static('C:/Users/salth/Documents/programming/projects/e-commerce-full-stack/resources'));


//middleware
//allow access to request body
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//initialize passport
app.use(passport.initialize());

//ROUTES
//login and register
app.use("/auth", require("./routes/auth"));

//user dashboard
app.use("/dashboard", require("./routes/dashboard"));
//shop
app.use("/shop", require("./routes/shop"));
//cart
app.use("/cart", require("./routes/cart"));
//END ROUTES

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});