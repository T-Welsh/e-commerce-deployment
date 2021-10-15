const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config;

const PORT = process.env.PORT || 5000;

//middleware
//allow access to request body
app.use(express.json());
app.use(cors());

//ROUTES

//END ROUTES

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});