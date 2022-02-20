const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const session = require('express-session');
const appRoutes = require('./routes/appRoutes');



app.use(express.json());


// SECURITY **************************************

app.use(cors({origin : 'http://localhost:8080'}));

app.use(helmet());

// COMMUNICATE WITH THE API
app.use(helmet.contentSecurityPolicy({
    directives : {
      defaultSrc: ["'self'", "localhost:3000"],
      imgSrc : ["'self'", "localhost:3000"]
    }}));



// SESSION *************************************

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
  secret: process.env.COOKIESECRET,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false,
  name : 'jj2jkjliIH4'
}));



  

// SET VIEWS DIRECTORY
app.set('views', path.join(__dirname, 'views')); 

// SET EXTENSION AND LANGUAGE USED FOR VIEWS
app.set('view engine', 'ejs');

// INDICATE THE PUBLIC DIRECTORY
app.use(express.static("dist"));
app.use("/icon/", express.static("icon"));

// ROUTER
app.use('/', appRoutes);



module.exports = app;