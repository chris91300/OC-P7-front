
import React from "react";
import ProfilImage from "./ProfilImage.jsx";
import { FaFlag } from "react-icons/fa";

const MediaAuthor = ( { urlProfil, pseudo, createdAtDate, createdAtHour, reported } )=>{



    return(
        <div className="media__author">
            <ProfilImage url={urlProfil}/>
            <div className="media__author__informations">
                <p>{pseudo}</p>
                <p>{`ajouté le ${createdAtDate} à ${createdAtHour}`}</p>
            </div>  
            {reported? <FaFlag /> : null}             
        </div>
    )
}



export default MediaAuthor;