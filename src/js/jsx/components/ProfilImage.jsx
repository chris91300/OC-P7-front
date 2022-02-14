
import React from "react";
import { useSelector } from "react-redux";


/**
 * Image of one user
 * @param {string} user image src 
 * @returns 
 */
const ProfilImage = ( { url=undefined } )=>{

    const currentUserUrlProfil = useSelector( ( state ) => state.user.urlProfil )
     url =  url == undefined ? currentUserUrlProfil : url;

    return(
        <div className="profil__image">
            <img src={ url } alt="image de votre profil" />
        </div>
    )
}

export default ProfilImage;