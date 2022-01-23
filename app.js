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
    next();
  });


  // Pour que l'on puisse autoriser à récupérer les images
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));




app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(express.static("dist"));
app.use('/', appRoutes);



module.exports = app;