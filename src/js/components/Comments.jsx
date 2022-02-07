
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../utils/fetch";
import ButtonSimple from "./ButtonSimple.jsx";
import Comment from "./Comment.jsx";
import Loading from "./Loading.jsx";


const Comments = ({ mediaId })=>{


    const urlApiGetComments = "http://localhost:3000/api/comments/"+mediaId;
    const [ loading, setLoading ] = useState(true)
    const [ userWantToSeeComments, setUserWantToSeeComments ] = useState(false)
    let comments = useSelector( ( state ) => state.comments)
    comments = comments[mediaId];
    const dispatch = useDispatch();

    /**
     * get all comments for  media with the id mediaId
     */
    useEffect( async()=>{
        
        try{

            let commentsList = await useFetch(urlApiGetComments)
            
            dispatch({type : "SET_COMMENTS", value : { mediaId : mediaId, comments : commentsList}})
            setLoading(false);

        } catch (err){
            console.log(err)
        }
        

        return ()=>{};

    }, [])

    

    /**
     * show comments if there are any
     */
     const areThereAnyComment = ()=>{
        return comments.length === 0 ? <p className="no-comment">aucun commentaire</p> : showComments()
    }


    /**
     * map the array comments and create a Comment component for each comment
     */
    const showComments = ()=>{
        return (
            <div className="comments" id={`media_${mediaId}_comments`} >
                {userWantToSeeComments ?
                    mapComments()
                    :
                    <ButtonSimple className="no-marge" onClick={handleClick}>{`voir les commentaires ( ${comments.length} )`}</ButtonSimple>
                }
                
                
            </div>
        )
    }


    const handleClick = ()=>{
        let userWantToSee = !userWantToSeeComments;
        
        setUserWantToSeeComments(userWantToSee);

        if ( !userWantToSee) {
            let elementId = `media_${mediaId}_comments`;
            let element = document.getElementById(elementId);
            let position = element.getBoundingClientRect();
            let positionY = position.y;
        
            scroll(0, positionY);
        }


        
    }

    /**
     * map the array comments and create a Comment component for each comment
     */
     const mapComments = ()=>{

        return (
                <>
                <ButtonSimple onClick={handleClick}>masquer les commentaires</ButtonSimple>
                {comments.map( ( comment ) => <Comment data={comment} key={comment.id}/>)}
                <ButtonSimple onClick={handleClick}>masquer les commentaires</ButtonSimple>
                </>
            )
            
    }



    return (
        <>
        {loading ? <Loading size="small" /> : areThereAnyComment()}
        </>)
}


export default Comments;