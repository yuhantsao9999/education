var mysql = require("mysql");
require('dotenv').config();
// connect mysql
// var con = mysql.createPool({
//     connectionLimit: 10,
//     host: "localhost",
//     user: "root",
//     password: "sweet840818",
//     database: "education",
//     // option
//     acquireTimeout: 10000,
//     waitForConnections: true,
//     queueLimit: 0,
// });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

var con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
});

con.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Mysql Connect");
});

module.exports = con