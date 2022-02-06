

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
    const createdDate = getDate(createdAt);
    const [ totalUserLiked, setTotalUserLiked ] = useState( userLiked.length );
    const [ userLikedCopy, setUserLikedCopy ] = useState( [...userLiked]);
    const urlApiLikeMedia = `http://localhost:3000/api/medias/${id}/like`;
    console.log("on est dans Media.jsx")
    console.log(data)


    const like = async ()=>{
        console.log("user like this media id => "+currentUserId)
        let listUserLiked = [...userLikedCopy]
        let index = listUserLiked.indexOf(currentUserId)
        let like = index === -1 ? 1 : 0;
        console.log("like => "+like) 
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
            console.log(response)
            if( like === 1 ){

                listUserLiked.push(currentUserId)

            } else {
                listUserLiked.splice(index, 1)
            }
            
            setTotalUserLiked( newTotal)
            setUserLikedCopy(listUserLiked);

        } catch(err){
            console.log(err)
        }        
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
        <div className="media">
            <div className="media__author">
                <ProfilImage url={urlProfil}/>
                <p>{pseudo}</p>                
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
                <ButtonSimple><AiOutlineComment />commenter</ButtonSimple>
                <ButtonSimple><FaRegFlag />signaler</ButtonSimple>
                {admin ? 
                <ButtonSimple><FaRegTrashAlt />supprimer</ButtonSimple> : null}
            </div>
            <FormComment name="comment" />
        </div>
    )
}

export default Media;