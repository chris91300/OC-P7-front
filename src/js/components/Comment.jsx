
import React from "react";
import getDate from "../utils/getDate";
import ProfilImage from "./ProfilImage.jsx";
import { FaRegFlag, FaFlag } from "react-icons/fa";
import ButtonSimple from "./ButtonSimple.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../utils/fetch";

const Comment = ( { data } )=>{    
    
    const commentId = data.id;
    const authorId = data.userId;
    const authorProfil = data.user.urlProfil;
    const authorPseudo = data.user.pseudo;
    const { mediaId, text, createdAt, reported } = data;
    const urlApiRportedComment = `http://localhost:3000/api/comments/${mediaId}/${commentId}/reported`;
    //let reported = data.reported == false || data.reported == "0" ? false : true;
    const [ createAtDate, createAtHours ] = getDate(createdAt);

    const [ commentIsReported, setCommentIsReported ] = useState(reported);
    const user = useSelector( (state) =>state.user );

    const [ error, setError ] = useState("");



    const reportedComment = async ()=>{

        try{

            let body = {
                userId : user.id
            }
            
            let options = {
                method : 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(body)
            }
            
            let response = await useFetch(urlApiRportedComment, options)
            setCommentIsReported(true);
            setError("");
            

        } catch(err){
            setError(err.message)
        }
        
    }


    return(
        <div className="comment">
            <div className="comment__profil">
                <ProfilImage url={authorProfil} />
            </div>
            <div className="comment__informations">
                <div className={commentIsReported ? "comment__informations__comment reported" :"comment__informations__comment" }>
                    <p><span className="bold">{ authorPseudo }</span></p>
                    <p><span className="bold">{ `posté le ${createAtDate} à ${createAtHours}` }</span></p>
                    <p>{ text }</p>
                </div>

                <div className="comment__informations__buttons">
                    <ButtonSimple onClick={reportedComment}>
                        {reported ? <FaFlag className="reported" /> : <FaRegFlag />}                        
                        signaler
                    </ButtonSimple>
                    <p className="error">{error}</p>
                </div>
            </div>
        </div>
    )

}


export default Comment;