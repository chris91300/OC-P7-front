
import React from "react";


/**
 * the container of the media image
 * @param {string} urlImage the src of the media image
 */
const MediaPicture = ( { urlImage } )=>{


    return(
        <div className="media__picture">
            <img src={urlImage} alt="Une image posté par un utilisateur."/>
        </div>
    )
}


export default MediaPicture;