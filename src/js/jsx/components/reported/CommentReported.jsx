
import React from "react";

import ReportedAuthor from "./ReportedAuthor.jsx";
import ReportedDate from "./ReportedDate.jsx";
import ReportedButtons from "./ReportedButtons.jsx";


/**
 * represente one reported comment in dashboard admin
 * @param {object} data informations about the reported comment
 */
const CommentReported = ( { data } )=>{    
    
    const commentId = data.id;
    const authorProfil = data.user.urlProfil;
    const authorPseudo = data.user.pseudo;
    const { text, createdAt } = data;



    return(
        <div className="item-reported">
            <ReportedAuthor
                author={authorPseudo}
                url={authorProfil}
            />
            
            <ReportedDate date={createdAt}/>

            <p className="item-reported__comment">{ text }</p>

            <ReportedButtons
                id={commentId}
                type="comment"
            />
            
        </div>
    )

}


export default CommentReported;