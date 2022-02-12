
import React from "react";
import ProfilImage from "./ProfilImage.jsx";


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