const mysql = require('mysql2');


const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"ABC123yoyo",
    database:"csc317db",
    connectionLimit: 50,
    waitForConnection: true,
    debug: true,


});

const promisePool = pool.promise();

module.exports = promisePool;
