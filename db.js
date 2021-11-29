const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
}

const productionConfig = {
    connectionString: process.env.DATABASE_URL //Comes from heroku addon
}

const pool = new Pool(process.env.NODE_ENV === "production" ? productionConfig : devConfig);


/*
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
});
*/
module.exports = pool;