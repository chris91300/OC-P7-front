
import React from "react";
import { useSelector } from "react-redux";



const ProfilImage = ()=>{

    const url = useSelector( ( state ) => state.user.urlProfil );

    return(
        <div className="profil__image">
            <img src={ url } alt="image de votre profil" />
        </div>
    )
}

export default ProfilImage;