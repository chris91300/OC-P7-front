
import React from "react";
import { useSelector } from "react-redux";
import ProfilChangeImage from "./profil/ProfilChangeImage.jsx";
import ProfilContainerImage from "./profil/ProfilContainerImage.jsx";
import ProfilDeleteUser from "./profil/ProfilDeleteUser.jsx";
import ProfilOneData from "./profil/ProfilOneData.jsx";


/**
 * the profil of the current user
 * show informations about him
 */
const Profil = ()=>{


    const user = useSelector( ( state ) => state.user );
    const { lastName, firstName, pseudo } = user;


    return(
        <div className="profil informations">
            <ProfilContainerImage />
            <ProfilOneData label="Nom :" value={lastName} />
            <ProfilOneData label="Prénom :" value={firstName} />
            <ProfilOneData label="Pseudo :" value={pseudo} />
            <ProfilChangeImage />
            <ProfilDeleteUser />
        </div>
    )

}


export default Profil;