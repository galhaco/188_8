const SQL = require ('./db');
const path = require ('path');
const cookie = require ('cookie-parser');

const createUsersTable = (req, res) => {
    const Q1 = 'CREATE TABLE IF NOT EXISTS `Users` (email varchar(200) NOT NULL PRIMARY KEY, username varchar(255) NOT NULL, password varchar(255) NOT NULL, favoriteCoin varchar(250) NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8';

    SQL.query(Q1, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        res.send("hi - user table created");
        console.log("hi - user table created");
    });
};

const dropAllTables = (req, res) => {
    const Q2 = 'DROP TABLE IF EXISTS `Users`';
    SQL.query(Q2, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        res.send("hi - All tables dropped");
        console.log("hi - ALL tables dropped");
    });
};


const createHistoryTable = (req, res) => {
    const Q3 = 'CREATE TABLE IF NOT EXISTS `TableB` (email varchar(200) NOT NULL PRIMARY KEY, username varchar(255) NOT NULL, fromCoin varchar(255) NOT NULL,amount int not null, toCoin varchar(250) not null) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    SQL.query(Q3, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        res.send("hi - history table created");
        console.log("hi - history table created");
    });
};



const createNewUser = (req, res) => {
    const newUser = {
      name: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    const checkQuery = 'SELECT * FROM Users WHERE email = ?';
    SQL.query(checkQuery, [newUser.email], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('Error checking user existence: ', checkErr);
        res.send('Something went wrong');
        return;
      }
      if (checkResult.length > 0) {
        // Display an alert pop-up message and redirect back to /signup
        res.send("<script>alert('Email already exists'); window.location.href = '/';</script>");
        return;
      }
      const insertQuery = 'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
      SQL.query(insertQuery, [newUser.name, newUser.password, newUser.email], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error creating a new user: ', insertErr);
          res.send('Something went wrong');
          return;
        }
        res.cookie('nameUser', newUser.email);
        console.log("user added, email:" + newUser.email);
        res.redirect('/login');
        });
   });
  };
  
  


 
    const loginCheck = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email"+email +"password"+ password) 
    const checkQuery = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    SQL.query(checkQuery, [email, password], (err, result) => {
      if (err) {
        console.error('Error checking login credentials:', err);
        res.status(500).send('Something went wrong');
        return;
      }
  
      if (result.length > 0) {
        res.cookie('nameUser', email);
        res.redirect('/home'); // Redirect to /home if login is successful
      } else {
              // Display an alert pop-up message and redirect back to /login
              res.send("<script>alert('Incorrect email or password'); window.location.href = '/';</script>");
              return;
      }
    });
};

module.exports = {createUsersTable, dropAllTables, createHistoryTable, createNewUser, loginCheck};
//insertQuery, checkQuery