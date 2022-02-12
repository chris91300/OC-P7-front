
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch";
import Loading from "./Loading.jsx";
import MediaReported from "./MediaReported.jsx";


const DashboardMedias = ( )=>{

    const urlApiAdminGetMediasReported = "http://localhost:3000/api/admin/medias/reported";
    const userToken = useSelector((state) => state.user.token);
    const [ mediasReported, setMediasReported ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    

    /**
     * OBJECTIF :
     * 1 RÉGLER LE PROBLÈME DE LOGIN SI ENTER KEY ET PASSWORD FAUX
     * 2 FINIR LE DASHBOARD
     * POUR LEMOMENT LES ROUTES FONCTIONNENT. 
     */




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
            setMediasReported(mediasReported)
            setIsLoading(false)

        } catch(err){

            console.log(err)
            setIsLoading(false)

        } finally{
            return ()=>{}
        }
        
    }, [])


    const renderMedias = ()=>{

        return mediasReported.map( (media) => <MediaReported data={media} key={media.id} />)

    }

    return( 
        <div id="admin_medias_reported" className="admin__reported__container show">
            <h2>MEDIAS SIGNALÉS</h2>
            { isLoading ? <Loading /> : renderMedias()}
        </div>
    )
}


export default DashboardMedias;