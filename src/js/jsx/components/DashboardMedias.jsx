
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch";


const DashboardMedias = ()=>{

    const urlApiAdminGetMediasReported = "http://localhost:3000/api/admin/medias/reported";
    const userToken = useSelector((state) => state.user.token)



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

            const mediasReported = await useFetch(urlApiAdminGetMediasReported, options);
            console.log("medias reported")
            console.log(mediasReported)

        } catch(err){

            console.log(err)

        } finally{
            return ()=>{}
        }
        
    }, [])

    return <h2>MEDIAS SIGNALÉS</h2>
}


export default DashboardMedias;