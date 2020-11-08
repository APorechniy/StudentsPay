const { response } = require('express');
const mysql = require('mysql2');
const config = require('./config.json')

let pool;

pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
});

module.exports = pool;