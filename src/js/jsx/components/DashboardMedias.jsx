
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch";
import Loading from "./Loading.jsx";
import MediaReported from "./MediaReported.jsx";


/**
 * list of the reported medias in dashboard admin
 */
const DashboardMedias = ( )=>{

    const urlApiAdminGetMediasReported = "http://localhost:3000/api/admin/medias/reported";
    const userToken = useSelector((state) => state.user.token);
    const mediasReported = useSelector( ( state ) => state.medias_reported );
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState("");
    const dispatch = useDispatch();
    

    /**
     * get all medias reported when component did mount
     */
    useEffect( async ()=>{

        try{
            let options = {
                method : 'GET',
                headers: {
                    'Authorization' : 'Bearer '+userToken
                }
            }

            let mediasReported = await useFetch(urlApiAdminGetMediasReported, options);
            dispatch({
                type : "ADD_MEDIAS_REPORTED",
                value : mediasReported
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


    const renderMedias = ()=>{

        if ( error != "" ){

            return <p className="error">{ error }</p>

        } else {

            if ( Object.keys(mediasReported).length == 0 ) {

                return <p>Aucun media n'a été signalé.</p>
    
            } else {
    
                return Object.entries( mediasReported ).map( ( [ index, media ] ) => <MediaReported data={media} key={media.id} />)
    
            }

        }

    }

    return( 
        <div id="admin_medias_reported" className="admin__reported__container show">
            <h2>MEDIAS SIGNALÉS</h2>
            { isLoading ? <Loading /> : renderMedias()}
        </div>
    )
}


export default DashboardMedias;