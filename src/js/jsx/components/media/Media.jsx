

import React, { useState } from "react";
import { useSelector } from "react-redux";

import getDate from '../../../utils/getDate';
import FormComment from "../../form/FormComment.jsx";
import useFetch from "../../../utils/fetch";
import Comments from "../Comments.jsx";
import MediaAuthor from "./MediaAuthor.jsx";
import MediaTitle from "./MediaTitle.jsx";
import MediaPicture from "./MediaPicture.jsx";
import MediaAction from "./MediaAction.jsx";



/**
 * Represent one media
 * @param {object} data the informations about the media
 */
const Media = ( { data, alone } )=>{
    
    const currentUser = useSelector( ( state ) => state.user );
    const token = currentUser.token;
    const admin = currentUser.admin;
    const currentUserId = currentUser.id;
    const { id, userId, title, text, urlImage, reported, userLiked, user, createdAt } = data;
    const { pseudo, urlProfil } = user;
    const [ comments, setComments ] = useState(data.comment);
    const [ createdAtDate, createdAtHour ] = getDate(createdAt);
    const [ totalUserLiked, setTotalUserLiked ] = useState( userLiked.length );
    const [ userLikedCopy, setUserLikedCopy ] = useState( [...userLiked ] );
    const [ mediaReported, setMediaReported ] = useState( reported );
    const urlApiLikeMedia = `http://localhost:3000/api/medias/${id}/like`;
    const urlApiReportedMedia = `http://localhost:3000/api/medias/${id}/reported`;


    /**
     * construct the clasName of the media
     * @returns {string} className the className of the media 
     */
    const MediaClass = ()=>{
        let className = "media";

        if ( mediaReported ) {

            className = className + " reported";

        }

        if ( alone ) {
            
            className = className + " alone";

        }

        return className;
    }
  


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
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+token
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
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+token
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
    


    /**
     * n'est plus utilisé. a supprimer après vérification
     */
    const addNewComment = (comment)=>{

        let listOfComments = comments ? [...comments] : [];
        listOfComments.push(comments)
        setComments(listOfComments);
    }


    


    return (
        <div className={MediaClass()} id={`media_${id}`}>
            <MediaAuthor
                urlProfil={urlProfil}
                pseudo={pseudo}
                createdAtDate={createdAtDate}
                createdAtHour={createdAtHour}
                reported={mediaReported}
            />

            <MediaTitle
                title={title}
                totalUserLiked={totalUserLiked}
            />
            
            <MediaPicture
                urlImage={urlImage}
            />

            <p>{text}</p>

            <MediaAction
                id={id}
                like={like}
                scrollToComment={scrollToComment}
                reportedMedia={reportedMedia}
                admin={admin}
            />

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