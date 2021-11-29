const express = require('express');
const app = express();
const cors = require('cors');
const passportSetup = require('./utils/passport');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

//set root directory for referencing static files 
//app.use(express.static('C:/Users/salth/Documents/programming/projects/e-commerce-full-stack/resources'));
//app.use(express.static(path.join(__dirname,  '../')));

//middleware
//allow access to request body
app.use(express.json());
app.use(cors());
app.use(cookieParser());

if(process.env.nodeENV === "production"){
    //serve static content
    app.use(express.static(path.join(__dirname, "frontend/build")));
}else{
    //app.use(express.static(path.join(__dirname, "resources")));
    app.use(express.static(__dirname));
}

//initialize passport
app.use(passport.initialize());

//ROUTES
/*
app.get("/", (req,res) => {
    //res.redirect(process.env.FRONT_END_ADDRESS);
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});
*/
//login and register
app.use("/auth", require("./routes/auth"));
//user dashboard
app.use("/dashboard", require("./routes/dashboard"));
//shop
app.use("/shop", require("./routes/shop"));
//cart
app.use("/cart", require("./routes/cart"));
//checkout
app.use("/checkout", require("./routes/checkout"));
//order history
app.use("/orders", require("./routes/orders"))
/*
app.get("/*", (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});
*/
app.get("*", (req,res) => {
    //res.redirect(process.env.FRONT_END_ADDRESS);
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});
//END ROUTES

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});