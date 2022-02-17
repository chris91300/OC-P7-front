const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();
const session = require('express-session');
const appRoutes = require('./routes/appRoutes');



app.use(express.json());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
  secret: process.env.COOKIESECRET,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   /* res.setHeader('Content-Security-Policy', 'default-src http://localhost:3000');*/
    next();
  });


  
app.use(helmet());
// Pour que l'on puisse autoriser à récupérer les images
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
// pour communiquer avec l'API
app.use(helmet.contentSecurityPolicy({
    directives : {
      defaultSrc: ["'self'", "localhost:3000"],
      imgSrc : ["'self'", "localhost:3000"]
    }}));




app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(express.static("dist"));
app.use('/', appRoutes);



module.exports = app;