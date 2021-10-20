const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

//middleware
//allow access to request body
app.use(express.json());
app.use(cors());

//ROUTES
//login and register
app.use("/auth", require("./routes/jwtauth"));

//user dashboard
app.use("/dashboard", require("./routes/dashboard"));
//shop

//END ROUTES

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});