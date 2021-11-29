const pgp = require('pg-promise')();

const config = {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
};

const db = pgp(config);

module.exports = db;