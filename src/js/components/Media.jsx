

import React from "react";
import { useSelector } from "react-redux";
import getDate from '../utils/getDate';
import ProfilImage from "./ProfilImage.jsx";
import ButtonSimple from "./ButtonSimple.jsx";
import { FaHeart, FaComments, FaFlag, FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import FormComment from "./form/FormComment.jsx";
import { useState } from "react";
import useFetch from "../utils/fetch";
import Comments from "./Comments.jsx";

/**
 * coeur vide => far fa-heart
 * coeur plein => fas fa-heart
 * comment => far fa-comments
 * reported vide => far fa-flag
 * repoted plein => fas fa-flag
 * delete choix 1 => far fa-trash-alt
 * delete choix 2 => fas fa-trash-alt
 * delete choix 3 => fas fa-trash
 */

const Media = ( { data } )=>{
    
    const currentUser = useSelector( ( state ) => state.user );
    const admin = currentUser.admin;
    const currentUserId = currentUser.id;
    const { id, userId, title, text, urlImage, reported, userLiked, user, createdAt } = data;
    const { pseudo, urlProfil } = user;
    const [ comments, setComments ] = useState(data.comment);
    console.log("les commentaire pour le media "+id)
    console.log(comments)
    const createdDate = getDate(createdAt);
    const [ totalUserLiked, setTotalUserLiked ] = useState( userLiked.length );
    const [ userLikedCopy, setUserLikedCopy ] = useState( [...userLiked ] );
    const [ mediaReported, setMediaReported ] = useState( reported );
    const urlApiLikeMedia = `http://localhost:3000/api/medias/${id}/like`;
    const urlApiReportedMedia = `http://localhost:3000/api/medias/${id}/reported`;
  //  console.log("on est dans Media.jsx")
  //  console.log(data)


    /**
     * user can like or dislike the media
     * on click on button like :
     * check if user already liked 
     * if yes => remove user id on userLiked array and on database
     * if non => add user id on userLiked array and on database
     */
    const like = async ()=>{
        
        let listUserLiked = [...userLikedCopy]
        let index = listUserLiked.indexOf(currentUserId)
        let like = index === -1 ? 1 : 0;        
        let add = like === 1 ? 1 : -1;
        let newTotal = parseInt(totalUserLiked) + add;
        let body = {
            userId : currentUserId,
            like : like
        }

        let options = {
            method : 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        }

        try{

            let response = await useFetch(urlApiLikeMedia, options);
            
            if( like === 1 ){

                listUserLiked.push(currentUserId)

            } else {
                listUserLiked.splice(index, 1)
            }
            
            setTotalUserLiked( newTotal)
            setUserLikedCopy(listUserLiked);

        } catch(err){
            console.log(err)
            //  gerer les erreur avec une modal
        }        
    }

    /**
     * on click on button comment, scroll to the textare and focus on it for write comment
     */
    const scrollToComment = ()=>{
        let elementId = `comment_media_${id}_comment`;
        let element = document.getElementById(elementId);
        let position = element.getBoundingClientRect();
        let positionY = position.y;
        
        scroll(0, positionY);
        element.focus();

    }

    /**
     * user can reported the media
     * admin will can see the reported media and delete it 
     */
    const reportedMedia = async ()=>{
        let body = {
            userId : currentUserId,
        }

        let options = {
            method : 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        }

        try{

            let response = await useFetch(urlApiReportedMedia, options);
            
            setMediaReported(true);

        } catch(err){
            console.log(err)
            //  gerer les erreur avec une modal
        }  

        
    }
    


    const addNewComment = (comment)=>{

        let listOfComments = comments ? [...comments] : [];
        listOfComments.push(comments)
        setComments(listOfComments);
    }


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


    return (
        <div className={mediaReported ? "media reported" : "media"}>
            <div className="media__author">
                <ProfilImage url={urlProfil}/>
                <p>{pseudo}</p>   
                {mediaReported? <FaFlag /> : null}             
            </div>
            <div className="media__title">
                <p className="media__title__title">{title}</p>
                {totalUserLiked > 0 ? showTotalUserLiked() : null}
            </div>
            
            <div className="media__picture">
                <img src={urlImage} />
            </div>
            <p>{text}</p>
            <div className="media__action">
                <ButtonSimple onClick={like}><AiOutlineHeart />j'aime</ButtonSimple>
                <ButtonSimple onClick={scrollToComment}><AiOutlineComment />commenter</ButtonSimple>
                <ButtonSimple onClick={reportedMedia}><FaRegFlag />signaler</ButtonSimple>
                {admin ? 
                <ButtonSimple><FaRegTrashAlt />supprimer</ButtonSimple> : null}
            </div>
            <Comments mediaId={id} />
            <FormComment
                name={`comment_media_${id}`}
                mediaId={id}
                userId={currentUserId}
                returnNewComment={addNewComment}
                />
        </div>
    )
}

export default Media;