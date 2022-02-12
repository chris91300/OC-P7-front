
import React from "react";
import getDate from "../../utils/getDate";
import ProfilImage from "./ProfilImage.jsx";
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import ButtonSimple from "./ButtonSimple.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch";
import { useDispatch } from "react-redux";

const CommentReported = ( { data } )=>{    
    
    const commentId = data.id;
    const authorId = data.userId;
    const authorProfil = data.user.urlProfil;
    const authorPseudo = data.user.pseudo;
    const { mediaId, text, createdAt, reported } = data;
    const urlDeleteComment = `http://localhost:3000/api/admin/comments/${commentId}/delete`;
    const urlRemoveReportedComment = `http://localhost:3000/api/admin/comments/${commentId}/remove_reported`; 
    const [ createAtDate, createAtHours ] = getDate(createdAt);
    const userToken = useSelector( ( state ) => state.user.token)
    const dispatch = useDispatch();
    
    const user = useSelector( (state) =>state.user );

    const [ error, setError ] = useState("");



     /**
     * delete definitively the comment
     */
      const deleteComment = async ()=>{
        try{

            let options = {
                method : 'DELETE',
                headers: {
                    'Authorization' : 'Bearer '+userToken
                }
            }

            let response = await useFetch(urlDeleteComment, options)
            dispatch({
                type : "REMOVE_COMMENT_REPORTED",
                value : commentId 
            })


        } catch(err){
            console.log(err)
        }
    }


    /**
     * remove the reporting of the comment
     */
    const removeReported = async ()=>{
        
        try{

            let options = {
                method : 'GET',
                headers: {
                    'Authorization' : 'Bearer '+userToken
                }
            }

            let response = await useFetch(urlRemoveReportedComment, options)

            dispatch({
                type : "REMOVE_COMMENT_REPORTED",
                value : commentId 
            })


        } catch(err){
            console.log(err)
        }
    }


    return(
        <div className="comment">
            <div className="comment__profil">
                <ProfilImage url={authorProfil} />
            </div>
            <div className="comment__informations">
                <div className="comment__informations__comment" >
                    <p><span className="bold">{ authorPseudo }</span></p>
                    <p><span className="bold">{ `posté le ${createAtDate} à ${createAtHours}` }</span></p>
                    <p>{ text }</p>
                </div>

                <div className="comment__informations__buttons">
                    <ButtonSimple onClick={removeReported}><FaRegFlag />retirer le signalement</ButtonSimple>
                    <ButtonSimple onClick={deleteComment}><FaRegTrashAlt />supprimer le commentaire</ButtonSimple>
                    <p className="error">{error}</p>
                </div>
            </div>
        </div>
    )

}


export default CommentReported;