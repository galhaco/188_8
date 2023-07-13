const mysql = require('mysql2');
const config = require('./db.config');

const connection = mysql.createConnection({
    host: config.HOST,
    DB: config.DB,
    password: config.PASSWORD,
    user: config.USER
});

connection.connect(error=>{
    if (error) throw error;
    console.log("connected to DB");
    
});



module.export = {connection};