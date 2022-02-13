
import React from "react";
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useFetch from "../../../utils/fetch.js";
import ButtonSimple from "../ButtonSimple.jsx";


/**
 * the container of buttons to manage the reported media
 * @param {string} id the media id 
 */
const ReportedButtons = ( { id, type } )=>{

    const urlDeleteMedia = `http://localhost:3000/api/admin/medias/${id}/delete`;
    const urlRemoveReportedMedia = `http://localhost:3000/api/admin/medias/${id}/remove_reported`; 
    const urlDeleteComment = `http://localhost:3000/api/admin/comments/${id}/delete`;
    const urlRemoveReportedComment = `http://localhost:3000/api/admin/comments/${id}/remove_reported`;    
    const userToken = useSelector( ( state ) => state.user.token)
    const dispatch = useDispatch();


    const removeReported = ()=>{
        
        let options = {
            method : 'GET',
            headers: {
                'Authorization' : 'Bearer '+userToken
            }
        }
        switch(type) {

            case "media":
                removeReportedMedia(options);
                break

            case "comment":
                removeReportedComment(options);
                break

            default:
                //nothing
        }
    }

    const deleteReported = ()=>{
        
        let options = {
            method : 'DELETE',
            headers: {
                'Authorization' : 'Bearer '+userToken
            }
        }

        switch(type) {

            case "media":
                deleteReportedMedia(options);
                break

            case "comment":
                deleteReportedComment(options);
                break
            default:
                //nothing
        }
    }

    /**
     * delete definitively the media
     */
    const deleteReportedMedia = async (options)=>{
        try{

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
    const removeReportedMedia = async (options)=>{
        
        try{            

            let response = await useFetch(urlRemoveReportedMedia, options)

            dispatch({
                type : "REMOVE_MEDIA_REPORTED",
                value : id 
            })


        } catch(err){
            console.log(err)
        }
    }

      /**
     * delete definitively the comment
     */
       const deleteReportedComment = async (options)=>{
        try{            

            let response = await useFetch(urlDeleteComment, options)
            dispatch({
                type : "REMOVE_COMMENT_REPORTED",
                value : id 
            })


        } catch(err){
            console.log(err)
        }
    }


     /**
     * remove the reporting of the comment
     */
      const removeReportedComment = async (options)=>{
        
        try{


            let response = await useFetch(urlRemoveReportedComment, options)

            dispatch({
                type : "REMOVE_COMMENT_REPORTED",
                value : id 
            })


        } catch(err){
            console.log(err)
        }
    }


    return(
        <div className="reported__buttons">
            <button onClick={removeReported}><FaRegFlag />retirer le signalement</button>
            <button onClick={deleteReported}><FaRegTrashAlt />supprimer</button>
        </div>
    )
}


export default ReportedButtons;