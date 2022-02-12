
import React from "react";
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch.js";

import ButtonSimple from "./ButtonSimple.jsx";


const MediaReportedButtons = ( { id } )=>{

    const urlDeleteMedia = `http://localhost:3000/api/admin/medias/${id}/delete`;
    const urlRemoveReportedMedia = `http://localhost:3000/api/admin/medias/${id}/remove_reported`;    
    
    const userToken = useSelector( ( state ) => state.user.token)
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
                type : "REMOVE_MEDIA_REPORTED",
                value : id 
            })


        } catch(err){
            console.log(err)
        }
    }


    /**
     * remove the reporting of the media
     */
    const removeReported = async ()=>{
        
        try{

            let options = {
                method : 'GET',
                headers: {
                    'Authorization' : 'Bearer '+userToken
                }
            }

            let response = await useFetch(urlRemoveReportedMedia, options)

            dispatch({
                type : "REMOVE_MEDIA_REPORTED",
                value : id 
            })


        } catch(err){
            console.log(err)
        }
    }


    return(
        <div className="media-reported__buttons">
            <ButtonSimple onClick={removeReported}><FaRegFlag />retirer le signalement</ButtonSimple>
            <ButtonSimple onClick={deleteMedia}><FaRegTrashAlt />supprimer le media</ButtonSimple>
        </div>
    )
}


export default MediaReportedButtons;