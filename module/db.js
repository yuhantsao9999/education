var mysql = require("mysql");
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

// connect mysql
const mysqlCon = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // option
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
});

// mysqlCon.getConnection((error, connection) => {
//     console.log('MySQL connected')
//     if (error) {
//         if (connection) connection.release()
//         return
//     }
// });


// var mysqlCon = mysql.createConnection({
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_DATABASE,
// });

// mysqlCon.connect(function(err) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log("Mysql Connect");
// });



const sql_query = function(sql, params) {
    return new Promise(function(resolve, reject) {
        mysqlCon.query(sql, params, function(error, results) {
            if (error) {
                console.log(error)
                reject(error);
            } else {
                // console.log(results)
                resolve(results);
            }
        });
    });
}

const sql_query_transaction = function(sql, params, connection) {
    return new Promise(function(resolve, reject) {
        connection.query(sql, params, function(error, results) {
            if (error) {
                reject("Database Query Error: " + error);
                return (connection.rollback(() => connection.release()))
            } else
                resolve(results);
        });
    });
}

module.exports = {
    core: mysql,
    pool: mysqlCon,
    sql_query: sql_query,
    sql_query_transaction: sql_query_transaction
};