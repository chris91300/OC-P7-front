
import React from "react";
import { useSelector } from "react-redux";
import ProfilImage from "./ProfilImage.jsx";
import getDate from "../utils/getDate.js";


const ProfilAside = ()=>{

    const user = useSelector( (state) => state.user )
    const [ createAtDate, createAtHours ] = getDate(user.createdAt);

    return(
        <aside className="profil__aside">
            <ProfilImage />
            <p>Nom : <span className="bold">{user.lastName}</span></p>
            <p>Prénom : <span className="bold">{user.firstName}</span></p>
            <p>Pseudo : <span className="bold">{user.pseudo}</span></p>
            <p>créé le : <span className="bold">{createAtDate}</span></p>
        </aside>
    )
}


export default ProfilAside;