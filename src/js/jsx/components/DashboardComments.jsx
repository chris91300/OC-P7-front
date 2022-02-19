
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Loading from "./Loading.jsx";
import CommentReported from "./CommentReported.jsx";
import { useDispatch } from "react-redux";
import useRequestApi from "../../utils/requestApi";


/**
 * the list of all reported comments in dashboard admin
 */
const DashboardComments = ( )=>{

    const token = useSelector((state) => state.user.token);
    const commentsReported = useSelector( ( state ) => state.comments_reported );
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState("");


    /**
     * get all coments reported when component did mount
     */
     useEffect( async ()=>{

        try{
            

            let commentsReported = await useRequestApi({
                entity : 'admin',
                request : 'getCommentsReported',
                token : token
            });
            
            dispatch({
                type : "ADD_COMMENTS_REPORTED",
                value : commentsReported
            })
            setIsLoading(false)

        } catch(err){

            console.log(err)
            setError(err.message)
            setIsLoading(false)

        } finally{
            return ()=>{}
        }
        
    }, [])


    const renderComments = ()=>{

        if ( error != "" ) {

            return <p className="error">{ error }</p>

        } else {

            if ( Object.keys(commentsReported).length == 0 ) {

                return <p>Aucun commentaire n'a été signalé.</p>
    
            } else {
    
                return Object.entries( commentsReported ).map( ( [ index, comment ] ) => <CommentReported data={comment} key={comment.id} />)
    
            }

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