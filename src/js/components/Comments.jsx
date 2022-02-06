
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../utils/fetch";
import Loading from "./Loading.jsx";


const Comments = ({ mediaId })=>{


    const urlApiGetComments = "http://localhost:3000/api/comments/"+mediaId;
    const [ loading, setLoading ] = useState(true)
    const comments = useSelector( ( state ) => state.comments[mediaId])
    const dispatch = useDispatch();

    /**
     * get all comments for  media with the id mediaId
     */
    useEffect( async()=>{
        console.log("dans useEffect on va récup les commentaires et comments vaut ")
        console.log(comments)
        try{

            let commentsList = await useFetch(urlApiGetComments)
            console.log("list des commentaires dans le use Effect")
            console.log(commentsList)
            
            dispatch({type : "SET_COMMENTS", value : { mediaId : mediaId, comments : commentsList}})
            setLoading(false);

        } catch (err){
            console.log(err)
        }
        

        return ()=>{};

    }, [])


    useEffect(()=>{
        console.log("les comments ont été modifiés")
        console.log(comments)
    }, [comments])


    const showComments = ()=>{
        return comments.length === 0 ? <p>il n'y a pas de commentaire</p> : <p>il y a des commentaires</p>
    }

    return (
        <>
        {loading ? <Loading size="small" /> : showComments()}
        </>)
}


export default Comments;