
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch";


const DashboardComments = ()=>{

    const urlApiAdminGetCommentsReported = "http://localhost:3000/api/admin/comments/reported";
    const userToken = useSelector((state) => state.user.token);

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

            const commentsReported = await useFetch(urlApiAdminGetCommentsReported, options);
            console.log("comments reported")
            console.log(commentsReported)

        } catch(err){

            console.log(err)

        } finally{
            return ()=>{}
        }
        
    }, [])

    return <h2>COMMENTS SIGNALÉS</h2>
}


export default DashboardComments;