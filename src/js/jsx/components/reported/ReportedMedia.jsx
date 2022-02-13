
import React from "react";


const ReportedMedia = ( { title, urlImage, description } )=>{

    

    return(
        <div className="reported__media">
            <p>{title}</p>
            <div className="reported__media__picture">
                <img src={urlImage} />
            </div>
            <p className="reported__media__description">{description}</p>
        </div>
    )

}


export default ReportedMedia;