
import React from "react";


/**
 * show one information about the user
 * @param {string} label the information 
 * @param {string} value  the value of the information
 */
const ProfilOneData = ( { label, value } )=>{


    return(
        <div className="profil__data profil-item">
            <p className="bold">{ label }</p>
            <p>{ value }</p>
        </div>
    )
}


export default ProfilOneData;