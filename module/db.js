var mysql = require("mysql");

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

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "education",
});

con.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Mysql Connect");
});

module.exports = con