
import React from "react";
import { FaFlag } from "react-icons/fa";
import ProfilImage from "../ProfilImage.jsx";


/**
 * the container of informations about the media author
 * @param {string} urlProfil the url of the picture of the user (avatar)
 * @param {string} pseudo, the user pseudo
 * @param {string} createdAtDate the date when media was create
 * @param {string} createdAtHour the hour when media was create
 * @param {boolean} reported if the media have been reported
 */
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