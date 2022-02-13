

import React from "react";
import { Link } from "react-router-dom";
import picture from "../../../img/groupomania.jpg";

const Page404 = ()=>{


    return(
        <main id="page_404">
            <img src={picture} alt="image du logo du groupe avec son nom, Groupomania" />
            <h1>Erreur 404</h1>
            <p>Désolé il n'y a rien ici</p>
            <Link to="/">retour à l'accueil</Link>
        </main>
    )

}



export default Page404;