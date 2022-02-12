
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch";
import Loading from "./Loading.jsx";
import CommentReported from "./CommentsReported.jsx";


const DashboardComments = ( )=>{

    const urlApiAdminGetCommentsReported = "http://localhost:3000/api/admin/comments/reported";
    const userToken = useSelector((state) => state.user.token);
    const [ commentsReported, setCommentsReported ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
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
            console.log("comments reported")
            console.log(commentsReported)
            setCommentsReported(commentsReported);
            setIsLoading(false)

        } catch(err){

            console.log(err)
            setIsLoading(false)

        } finally{
            return ()=>{}
        }
        
    }, [])


    const renderComments = ()=>{

        return commentsReported.map( (comment) => <CommentReported data={comment} key={comment.id} />)

    }

    return( 
        <div id="admin_comments_reported" className="admin__reported__container hide">
            <h2>COMMENTS SIGNALÉS</h2>
            { isLoading ? <Loading /> : renderComments()}
        </div>
    ) 
}


export default DashboardComments;