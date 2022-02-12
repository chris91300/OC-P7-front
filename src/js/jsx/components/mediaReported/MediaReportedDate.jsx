
import React from "react";
import getDate from "../../../utils/getDate";


/**
 * the container of the date of the creation of the media
 * @param {string} date the date of the creation of the media
 */
const MediaReportedDate = ( { date } )=>{

    const [ createdDate, createdHour ] = getDate(date);

    return(
        <div className="media-reported__date">
            <p>{`Posté le ${createdDate} à ${createdHour}`}</p>
        </div>
    )

}


export default MediaReportedDate;