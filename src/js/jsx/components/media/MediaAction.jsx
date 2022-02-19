
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";

import ButtonSimple from "../ButtonSimple.jsx";
import requestApi from "../../../utils/requestApi.js";


/**
 * the container of the buttons like, comment, reported and for admin, delete
 * @param {string} id the media id
 * @param {function} like a callback. use if user like this 
 * @param {object} userLiked the array of users who like this media
 * @param {function} scrollToComment a callback. use if user when read a comment * 
 * @param {function} reportedMedia a callback. use if user want to reported the media
 * @param {boolean} admin if the user is an administrator
 */
const MediaAction = ( { id, like, userLiked, scrollToComment, reportedMedia, admin } )=>{

    const user = useSelector( ( state ) => state.user);
    const userId = user.id;
    const token = user.token;
    const dispatch = useDispatch();
    const userLikeThisMedia = userLiked.indexOf(userId) != -1 ? true : false;

    /**
     * delete definitively the media
     */
     const deleteMedia = async ()=>{
        try{


            let response = await requestApi({
                entity : 'admin',
                request : 'deleteMedia',
                mediaId : id,
                token : token
            });

            dispatch({
                type : "DELETE_MEDIA",
                value : id 
            })


        } catch(err){
            console.log(err)
        }
    }


    return(
        <div className="media__action">
            <ButtonSimple onClick={()=> like()}>
                { userLikeThisMedia ? <AiFillHeart className="user-like-media"/>  : <AiOutlineHeart /> }
                <span className="text-icon">j'aime</span>
            </ButtonSimple>

            <ButtonSimple onClick={()=> scrollToComment()}>
                <AiOutlineComment />
                <span className="text-icon">commenter</span>
            </ButtonSimple>

            <ButtonSimple onClick={()=> reportedMedia()}>
                <FaRegFlag />
                <span className="text-icon">signaler</span>
            </ButtonSimple>

            {admin ? 
            <ButtonSimple onClick={deleteMedia} >
                <FaRegTrashAlt />
                <span className="text-icon">supprimer</span>
            </ButtonSimple> : null}
        </div>
    )

}



export default MediaAction;