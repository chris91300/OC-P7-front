
import React from "react";


/**
 * the container of the media image
 * @param {string} urlImage the src of the media image
 */
const MediaPicture = ( { urlImage } )=>{


    return(
        <div className="media__picture">
            <img src={urlImage} />
        </div>
    )
}


export default MediaPicture;