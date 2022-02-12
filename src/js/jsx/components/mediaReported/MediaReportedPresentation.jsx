
import React from "react";


const MediaReportedPresentation = ( { title, urlImage, description } )=>{

    

    return(
        <div className="media-reported__Presentation">
            <p>{title}</p>
            <div className="media-reported__picture">
                <img src={urlImage} />
            </div>
            <p>{description}</p>
        </div>
    )

}


export default MediaReportedPresentation;