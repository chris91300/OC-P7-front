require("dotenv").config();
const app = require('./app');



app.use( ( req, res ) =>{
    res.status(301).redirect("/");
} )


app.listen(process.env.PORT || 8080,  ()=>{
    console.log("on redirect")
    console.log("serveur à l'écoute sur le port "+ process.env.PORT)
});
