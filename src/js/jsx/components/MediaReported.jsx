
import React from "react";
import MediaReportedAuthor from "./MediaReportedAuthor.jsx";
import MediaReportedButtons from "./MediaReportedButtons.jsx";
import MediaReportedDate from "./MediaReportedDate.jsx";
import MediaReportedPresentation from "./MediaReportedPresentation.jsx";



const MediaReported = ( { data } )=>{

    console.log(data)
    const author = data.user;
    const { id, createdAt, title, text, urlImage } = data;

    return (
        <div id={`media_reported_${id}`}  className="media-reported">
            <MediaReportedAuthor
                author={author.pseudo}
                urlProfil={author.urlProfil}
            />
            <MediaReportedDate
                date={createdAt}
            />
            <MediaReportedPresentation
                title={title}
                description={text}
                urlImage={urlImage}
            />
            <MediaReportedButtons
                id={id}
            />
        </div>
    )
}



export default MediaReported;