
import React from "react";
import ButtonSimple from "../ButtonSimple.jsx";
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { useSelector } from "react-redux";
import useFetch from "../../../utils/fetch.js";
import { useDispatch } from "react-redux";


/**
 * the container of the buttons like, comment, reported and for admin, delete
 * @param {string} id the media id
 * @param {function} like a callback. use if user like this 
 * @param {function} scrollToComment a callback. use if user when read a comment * 
 * @param {function} reportedMedia a callback. use if user want to reported the media
 * @param {boolean} admin if the user is an administrator
 */
const MediaAction = ( { id, like, scrollToComment, reportedMedia, admin } )=>{

    const urlDeleteMedia = `http://localhost:3000/api/admin/medias/${id}/delete`;
    const userToken = useSelector( ( state ) => state.user.token);
    const dispatch = useDispatch();

    /**
     * delete definitively the media
     */
     const deleteMedia = async ()=>{
        try{

            let options = {
                method : 'DELETE',
                headers: {
                    'Authorization' : 'Bearer '+userToken
                }
            }

            let response = await useFetch(urlDeleteMedia, options)
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
            <ButtonSimple onClick={()=> like()}><AiOutlineHeart /><span className="text-icon">j'aime</span></ButtonSimple>
            <ButtonSimple onClick={()=> scrollToComment()}><AiOutlineComment /><span className="text-icon">commenter</span></ButtonSimple>
            <ButtonSimple onClick={()=> reportedMedia()}><FaRegFlag /><span className="text-icon">signaler</span></ButtonSimple>
            {admin ? 
            <ButtonSimple onClick={deleteMedia} ><FaRegTrashAlt /><span className="text-icon">supprimer</span></ButtonSimple> : null}
        </div>
    )

}



export default MediaAction;