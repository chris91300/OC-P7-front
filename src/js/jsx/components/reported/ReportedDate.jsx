
import React from "react";
import getDate from "../../../utils/getDate";


/**
 * the container of the date of the creation of the media
 * @param {string} date the date of the creation of the media
 */
const ReportedDate = ( { date } )=>{

    const [ createdDate, createdHour ] = getDate(date);

    return(
        <div className="item-reported__date">
            <p>
                <span className="bold">Posté le </span>
                {`${createdDate} à ${createdHour}`}
            </p>
        </div>
    )

}


export default ReportedDate;