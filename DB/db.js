const mysql = require('mysql2');
const dbconfig = require('./db.config');

const connection = mysql.createConnection({
    host: dbconfig.HOST,
    database: dbconfig.DATABASE,
    password: dbconfig.PASSWORD,
    user: dbconfig.USER
});

connection.connect(error=>{
    if (error) throw error;
    console.log("connected to DB");
});

module.exports = connection;







