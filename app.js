const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();
const appRoutes = require('./routes/appRoutes');



app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Content-Security-Policy', 'default-src http://localhost:3000');
    next();
  });


  
app.use(helmet());
// Pour que l'on puisse autoriser à récupérer les images
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
// pour communiquer avec l'API
app.use(helmet.contentSecurityPolicy({ directives : {defaultSrc: ["'self'", "http://localhost:3000"],}}));




app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(express.static("dist"));// voir comment indiquer "/dist"
app.use('/', appRoutes);



module.exports = app;