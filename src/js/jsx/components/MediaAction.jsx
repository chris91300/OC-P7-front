
import React from "react";
import ButtonSimple from "./ButtonSimple.jsx";
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch.js";
import { useDispatch } from "react-redux";



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
            <ButtonSimple onClick={()=> like()}><AiOutlineHeart />j'aime</ButtonSimple>
            <ButtonSimple onClick={()=> scrollToComment()}><AiOutlineComment />commenter</ButtonSimple>
            <ButtonSimple onClick={()=> reportedMedia()}><FaRegFlag />signaler</ButtonSimple>
            {admin ? 
            <ButtonSimple onClick={deleteMedia} ><FaRegTrashAlt />supprimer</ButtonSimple> : null}
        </div>
    )

}



export default MediaAction;