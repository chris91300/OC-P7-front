
import React from "react";


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