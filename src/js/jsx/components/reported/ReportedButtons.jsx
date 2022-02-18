
import React, { useState } from "react";
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import useFetch from "../../../utils/fetch.js";
import Loading from '../Loading.jsx';


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
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");


    /**
     * remove media or comment
     */
    const removeReported = ()=>{
        
        if ( !isLoading ){

            setErrorMessage("");
            setIsLoading(true)
        
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
    }


    /**
     * delete media or comment
     */
    const deleteReported = ()=>{

        if ( !isLoading ){

            setErrorMessage("");
            setIsLoading(true)
        
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
    }

    /**
     * delete definitively the media
     */
    const deleteReportedMedia = async (options)=>{
        try{

            let response = await useFetch(urlDeleteMedia, options);
            
            setIsLoading(false)
            dispatch({
                type : "REMOVE_MEDIA_REPORTED",
                value : id 
            })


        } catch(err){

            setIsLoading(false)
            setErrorMessage(err.message);            
            console.log(err)
        }
    }


    /**
     * remove the reporting of the media
     */
    const removeReportedMedia = async (options)=>{
        
        try{            

            let response = await useFetch(urlRemoveReportedMedia, options);

            setIsLoading(false);
            dispatch({
                type : "REMOVE_MEDIA_REPORTED",
                value : id 
            })


        } catch(err){

            setIsLoading(false)
            setErrorMessage(err.message);            
            console.log(err)
        }
    }

      /**
     * delete definitively the comment
     */
       const deleteReportedComment = async (options)=>{
        try{            

            let response = await useFetch(urlDeleteComment, options);

            setIsLoading(false);
            dispatch({
                type : "REMOVE_COMMENT_REPORTED",
                value : id 
            })


        } catch(err){
            
            setIsLoading(false)
            setErrorMessage(err.message);            
            console.log(err)
        }
    }


     /**
     * remove the reporting of the comment
     */
      const removeReportedComment = async (options)=>{
        
        try{


            let response = await useFetch(urlRemoveReportedComment, options)

            setIsLoading(false);
            dispatch({
                type : "REMOVE_COMMENT_REPORTED",
                value : id 
            })


        } catch(err){
            
            setIsLoading(false)
            setErrorMessage(err.message);            
            console.log(err)
        }
    }


    return(
        <>
        <div className="item-reported__buttons">
            <button onClick={removeReported}><FaRegFlag />retirer le signalement</button>
            <button onClick={deleteReported}><FaRegTrashAlt />supprimer</button>
        </div>
        {isLoading ? <Loading /> : null }
         <p className="form__error">{ errorMessage }</p>
        </>
    )
}


export default ReportedButtons;