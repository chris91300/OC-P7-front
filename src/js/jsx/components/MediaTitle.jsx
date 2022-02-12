
import React from "react";
import { AiFillHeart } from "react-icons/ai";


const MediaTitle = ( { title, totalUserLiked } )=>{


    /**
     * show one filled heart with the total of user who liked this media
     * only if total > 0
     */
     const showTotalUserLiked = ()=>{

        return (
            <div className="user-liked">
                <AiFillHeart />
                <p>{totalUserLiked}</p>
            </div>
        )
    }


    return(
        <div className="media__title">
            <p className="media__title__title">{title}</p>
            {totalUserLiked > 0 ? showTotalUserLiked() : null}
        </div>
    )
}


export default MediaTitle;