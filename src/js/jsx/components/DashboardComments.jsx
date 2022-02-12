
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch";
import Loading from "./Loading.jsx";
import CommentReported from "./CommentReported.jsx";
import { useDispatch } from "react-redux";


const DashboardComments = ( )=>{

    const urlApiAdminGetCommentsReported = "http://localhost:3000/api/admin/comments/reported";
    const userToken = useSelector((state) => state.user.token);
    const commentsReported = useSelector( ( state ) => state.comments_reported );
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(true);

    console.log("comments_reported")
    console.log(commentsReported)


    /**
     * get all coments reported when component did mount
     */
     useEffect( async ()=>{

        try{
            let options = {
                method : 'GET',
                headers: {
                    'Authorization' : 'Bearer '+userToken
                }
            }

            let commentsReported = await useFetch(urlApiAdminGetCommentsReported, options);
            console.log("retour de l'api")
            console.log(commentsReported)
            dispatch({
                type : "ADD_COMMENTS_REPORTED",
                value : commentsReported
            })
            setIsLoading(false)

        } catch(err){

            console.log(err)
            setIsLoading(false)

        } finally{
            return ()=>{}
        }
        
    }, [])


    const renderComments = ()=>{

        if ( Object.keys(commentsReported).length == 0 ) {

            return <p>Aucun commentaire n'a été signalé.</p>

        } else {

            return Object.entries( commentsReported ).map( ( [ index, comment ] ) => <CommentReported data={comment} key={comment.id} />)

        }
        

    }

    return( 
        <div id="admin_comments_reported" className="admin__reported__container hide">
            <h2>COMMENTS SIGNALÉS</h2>
            { isLoading ? <Loading /> : renderComments()}
        </div>
    ) 
}


export default DashboardComments;