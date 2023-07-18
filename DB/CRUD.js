const SQL = require ('./db');
const path = require ('path');
const cookie = require ('cookie-parser');

const createNewHistory = (req, res) => {
  const newHistory = {
    email: req.cookies.email,
    username: req.cookies.userName,
    fromCoin: req.body.fromCurrencySelect,
    amount: req.body.amount,
    ToCoin: req.body.toCurrencySelect
  };

  const insertHistoryQuery = `INSERT INTO HistoryTable (email, username, fromCoin, amount, toCoin) VALUES (?, ?, ?, ?, ?)`;

  SQL.query(insertHistoryQuery, [newHistory.email, newHistory.username, newHistory.fromCoin, newHistory.amount, newHistory.ToCoin], (insertErr, insertResult) => {
    if (insertErr) {
      console.error('Error creating a new history: ', insertErr);
      res.send('Something went wrong');
      return;
    }
    console.log("history added, email and amount: " + newHistory.email + "; " + newHistory.amount);
    return;
  });
};

const createNewUser = (req, res) => {
    const newUser = {
      name: req.body.username,
      password: req.body.password,
      email: req.body.email,
      favcoin: req.body.favoriteCoin
    };
    const checkQuery = 'SELECT * FROM Users WHERE email = ?';
    SQL.query(checkQuery, [newUser.email], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('Error checking user existence: ', checkErr);
        console.log(1222222222);
        res.send('Something went wrong');
        return;
      }
      if (checkResult.length > 0) {
        res.send("<script>alert('Email already exists'); window.location.href = '/';</script>");
        return;
      }
      const insertQuery = 'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
      SQL.query(insertQuery, [newUser.name, newUser.password, newUser.email, newUser.favcoin], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error creating a new user: ', insertErr);
          res.send('Something went wrong');
          return;
        }
        console.log("user added, email:" + newUser.email);
        res.redirect('/login');
        });
   });
  };
  
  const loginCheck = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email: "+email +"pass: "+ password) 
  
    const checkQuery = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    SQL.query(checkQuery, [email, password], (err, result) => {
      if (err) {
        console.error('Error checking login credentials:', err);
        res.status(500).send('Something went wrong');
        return;
      }
      if (result.length > 0) {
        res.cookie('email', email);
        res.cookie('userName', result[0].username);
        res.redirect('/home'); // Redirect to /home if login is successful
      } else {
              // Display an alert pop-up message and redirect back to /login
              res.send("<script>alert('Incorrect email or password'); window.location.href = '/login';</script>");
              return;
      }
    })};

const dropAllTables = (req, res) => {
    const Q2 = 'DROP TABLE IF EXISTS `Users`';
    SQL.query(Q2, (err, mysqlres) => {
        if (err) {
            console.log("Users table error",err);
            res.status(400).send("Users table error",err);
            return;
        }
        console.log("hi - Users tables dropped");
        const Q = 'DROP TABLE IF EXISTS `HistoryTable`';
        SQL.query(Q, (err, mysqlres) => {
            if (err) {
                console.log("Users table error",err);
                res.status(400).send("Users table error",err);
                return;
            }
            res.send("hi - All tables dropped");
            console.log("hi - HistoryTable tables dropped");
            return;
        });
        
    });
};

      const selectAllHistory = (req, res) => {

        const checkQuery = 'SELECT * FROM HistoryTable WHERE email = ?';
        SQL.query(checkQuery,req.cookies.email, (checkErr, checkResult) => {
          if (checkErr) {
            console.error('Error checking user existence: ', checkErr);
            res.send('Something went wrong');
            return;
          }
          
         res.send(checkResult); 
       });
      };
 
module.exports = {dropAllTables, createNewUser, loginCheck, createNewHistory,selectAllHistory};
