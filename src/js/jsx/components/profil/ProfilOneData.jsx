
import React from "react";



const ProfilOneData = ( { label, value } )=>{


    return(
        <div className="profil__data">
            <p className="bold">{ label }</p>
            <p>{ value }</p>
        </div>
    )
}


export default ProfilOneData;