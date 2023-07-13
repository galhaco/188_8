// import and set up
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cookie = require ('cookie-parser');
const sql = require ('./DB/db')
const CRUD = require ('./DB/CRUD');
//const db = require ('./DB/db.config');
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookie());
app.set('view engine', 'pug');





app.get('/createTable', CRUD.createUsersTable)
app.get('/dropTable', CRUD.dropAllTables)
app.post('/createHistoryTable', CRUD.createHistoryTable)
//app.get('/checkLogin', CRUD.loginCheck)
//app.get('/signUp', CRUD.insertQuery)
app.post('/formSignup', CRUD.createNewUser)
//app.get('/123', checkQuery)




//routing
app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/index.html"));

});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/signUp.html"));
});


app.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/login.html"));
});
  
app.get('/aboutus', (req,res) => {
    res.sendFile(path.join(__dirname,"views/aboutus.html"));
});
app.get('/Profile', (req,res) => {
    res.sendFile(path.join(__dirname,"views/Profile.html"));
});
app.post('/formLogin', (req, res) => {
    res.redirect('/home');
  }); 
  app.post('/formSignup', (req, res) => {
    console.log(req.body.favoriteCoin);
    res.cookie("fav" , req.body.favoriteCoin);
    res.redirect('/login');
  }); 

//set up listen
app.listen(port, ()=>{
    console.log("server is running on port", port);
});
