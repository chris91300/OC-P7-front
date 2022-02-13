
import React from "react";
import ReportedAuthor from "./reported/ReportedAuthor.jsx";
import ReportedButtons from "./reported/ReportedButtons.jsx";
import ReportedDate from "./reported/ReportedDate.jsx";
import ReportedMedia from "./reported/ReportedMedia.jsx";


/**
 * 
 * @param {object} data informations about the media
 */
const MediaReported = ( { data } )=>{

    const author = data.user;
    const { id, createdAt, title, text, urlImage } = data;

    return (
        <div id={`media_reported_${id}`}  className="item-reported">
            <ReportedAuthor
                author={author.pseudo}
                urlProfil={author.urlProfil}
            />
            <ReportedDate
                date={createdAt}
            />
            <ReportedMedia
                title={title}
                description={text}
                urlImage={urlImage}
            />
            <ReportedButtons
                id={id}
                type="media"
            />
        </div>
    )
}



export default MediaReported;