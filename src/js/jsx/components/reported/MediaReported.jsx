
import React from "react";

import ReportedAuthor from "./ReportedAuthor.jsx";
import ReportedButtons from "./ReportedButtons.jsx";
import ReportedDate from "./ReportedDate.jsx";
import ReportedMedia from "./ReportedMedia.jsx";


/**
 * represente one reported media
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