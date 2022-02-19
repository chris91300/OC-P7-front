
import React, { useState } from "react";
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import useRequestApi from "../../../utils/requestApi.js";
import Loading from '../Loading.jsx';


/**
 * the container of buttons to manage the reported media
 * @param {string} id the media id 
 */
const ReportedButtons = ( { id, type } )=>{
    
    const token = useSelector( ( state ) => state.user.token)
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
        
            switch(type) {

                case "media":
                    removeReportedMedia();
                    break

                case "comment":
                    removeReportedComment();
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
        

            switch(type) {

                case "media":
                    deleteReportedMedia();
                    break

                case "comment":
                    deleteReportedComment();
                    break
                default:
                    //nothing
            }
        }
    }

    /**
     * delete definitively the media
     */
    const deleteReportedMedia = async ()=>{
        try{

            let response = await useRequestApi({
                entity : 'admin',
                request : 'deleteMedia',
                token : token,
                mediaId : id
            })
            
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
    const removeReportedMedia = async ()=>{
        
        try{            

            let response = await useRequestApi({
                entity : 'admin',
                request : 'removeReportedMedia',
                token : token,
                mediaId : id
            })

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
       const deleteReportedComment = async ()=>{
        try{            

            let response = await useRequestApi({
                entity : 'admin',
                request : 'deleteComment',
                token : token,
                commentId : id
            })

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
      const removeReportedComment = async ()=>{
        
        try{


            let response = await useRequestApi({
                entity : 'admin',
                request : 'removeReportedComment',
                token : token,
                commentId : id
            })

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