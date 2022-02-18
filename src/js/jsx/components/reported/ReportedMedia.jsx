
import React from "react";


/**
 * return the title, image and description of the media
 * @param {string} title media title
 * @param {string} urlImage media picture src
 * @param {string} description media description
 */
const ReportedMedia = ( { title, urlImage, description } )=>{

    

    return(
        <div className="item-reported__media">
            <p>{title}</p>
            <div className="item-reported__media__picture">
                <img src={urlImage} />
            </div>
            <p className="item-reported__media__description">{description}</p>
        </div>
    )

}


export default ReportedMedia;