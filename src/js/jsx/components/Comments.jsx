
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../utils/fetch";
import ButtonSimple from "./ButtonSimple.jsx";
import Comment from "./Comment.jsx";
import Loading from "./Loading.jsx";



/**
 * Component Comments
 * when component did mount => get all comment of the current media
 * inform user if there ara or not comments
 * and show or hide comments
 * @param {*} mediaId the media id
 */
const Comments = ({ mediaId })=>{


    const urlApiGetComments = "http://localhost:3000/api/comments/"+mediaId;
    const [ loading, setLoading ] = useState(true)
    const [ userWantToSeeComments, setUserWantToSeeComments ] = useState(false)
    const [ scrollTo, setScrollTo ] = useState(false)
    const [ error, setError ] = useState("")
    let comments = useSelector( ( state ) => state.comments)
    let token = useSelector( ( state ) => state.user.token)
    comments = comments[mediaId];
    const dispatch = useDispatch();

    /**
     * get all comments for  media with the id mediaId
     */
    useEffect( async()=>{
        
        try{

            let options = {
                method : 'GET',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+token
                }
            }

            let commentsList = await useFetch(urlApiGetComments, options)
            
            dispatch({type : "SET_COMMENTS", value : { mediaId : mediaId, comments : commentsList}})
            setLoading(false);

        } catch (err){
            console.log(err)
            setError(err.message)
        }
        

        return ()=>{};

    }, [])

    
    /**
     * if user close the comments list, scroll to the top of the comments
     */
    useEffect(()=>{
        
        if ( scrollTo) {    
            
            let userWantToSee = !userWantToSeeComments;

            if ( !userWantToSee) {
                
                let elementId = `media_${mediaId}_comments`;
                let element = document.getElementById(elementId);
                let position = element.getBoundingClientRect();
                let positionY = position.y;
            
                scroll(0, positionY);
                setScrollTo(false);
            }
        }

        return ()=>{};
    }, [scrollTo])

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


    /**
     * show or hide comments
     * and if hide, scroll to the start of comments
     */
    const handleClick = ()=>{
        let userWantToSee = !userWantToSeeComments;
        
        setUserWantToSeeComments(userWantToSee);
        

        if ( !userWantToSee) {
            setScrollTo(true);
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
        <p className="error">{error}</p>
        </>)
}


export default Comments;