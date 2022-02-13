
import React, { useState } from "react";
import ReportedAuthor from "./reported/ReportedAuthor.jsx";
import ReportedDate from "./reported/ReportedDate.jsx";
import ReportedButtons from "./reported/ReportedButtons.jsx";

const CommentReported = ( { data } )=>{    
    
    const commentId = data.id;
    const authorId = data.userId;
    const authorProfil = data.user.urlProfil;
    const authorPseudo = data.user.pseudo;
    const { mediaId, text, createdAt, reported } = data;

    const [ error, setError ] = useState("");



    return(
        <div className="reported">
            <ReportedAuthor
                author={authorPseudo}
                url={authorProfil}
            />
            
            <ReportedDate date={createdAt}/>

            <p className="reported__comment">{ text }</p>

            <ReportedButtons
                id={commentId}
                type="comment"
            />
            
        </div>
    )

}


export default CommentReported;