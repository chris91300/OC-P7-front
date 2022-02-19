
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useRequestApi from "../../utils/requestApi";
import Loading from "./Loading.jsx";
import MediaReported from "./MediaReported.jsx";


/**
 * list of the reported medias in dashboard admin
 */
const DashboardMedias = ( )=>{

    const token = useSelector((state) => state.user.token);
    const mediasReported = useSelector( ( state ) => state.medias_reported );
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState("");
    const dispatch = useDispatch();
    

    /**
     * get all medias reported when component did mount
     */
    useEffect( async ()=>{

        try{

            let mediasReported = await useRequestApi({
                entity : 'admin',
                request : 'getMediasReported',
                token : token
            });

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