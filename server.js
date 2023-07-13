// import and set up
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const CookieParser = require ('cookie-parser')
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookie());

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
