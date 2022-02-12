
import React from "react";
import ProfilImage from "../ProfilImage.jsx";


/**
 * the container of informations about the media author
 * @param {string} author the media author 
 * @param {string} urlProfil the url of the picture of the author 
 */
const MediaReportedAuthor = ( { author, urlProfil } )=>{


    return(
        <div className="media-reported__author">
            <p>Auteur </p>
            <p className="title">{author}</p>
            <ProfilImage url={urlProfil} />
        </div>
    )

}


export default MediaReportedAuthor;