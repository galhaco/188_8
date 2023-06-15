// import and set up
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 2002;
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


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
//set up listen
app.listen(port, ()=>{
    console.log("server is running on port", port);
});
app.post('/formLogin', (req, res) => {
    res.redirect('/home');
  }); 
  app.post('/formSignup', (req, res) => {
    res.redirect('/login');
  }); 
