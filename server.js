require("dotenv").config();
const app = require('./app');




app.listen(process.env.PORT || 8080,  ()=>{
    
    console.log("serveur à l'écoute sur le port "+ process.env.PORT)
});
