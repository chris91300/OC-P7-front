require("dotenv").config();
const app = require('./app');




app.listen(process.env.PORT,  ()=>{
    
    console.log("serveur à l'écoute sur le port "+ process.env.PORT)
});
