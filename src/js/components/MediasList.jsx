

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useFetch from "../utils/fetch";
import Loading from "./Loading.jsx";
import Media from "./Media.jsx";


const MediasList = ()=>{

    const urlGetMedias = "http://localhost:3000/api/medias/";
    const [isLoading, setIsLoading ] = useState(true);
    const [error, setError ] = useState("");
    const medias = useSelector((state) => state.medias);
    const userToken = useSelector((state) => state.user.token)
    const dispatch = useDispatch();

    useEffect( async ()=>{
        let options = {
            method : 'GET',
            headers: {
                'Authorization' : 'Bearer '+userToken
            }
        }
        try{
            let mediasList = await useFetch(urlGetMedias, options);

            dispatch({
                type : "SET_MEDIAS",
                value : mediasList
            })
            
        } catch(err) {
            setError(err.message)
            
        } finally{
            setIsLoading(false)
        }
        
    }, [])


    
    const render = ()=>{
        if ( error != ""){
            return <p className="error">{error}</p>
        } else {

            if ( medias.length == 0 ) {
                return (
                    <>
                    <p>Aucun media n'a été posté pour le moment</p>
                    <p>Serez-vous le premier ou la première ?</p>
                    </>
                
                )
            } else {
               // return <p>Il y a des medias</p>
                
               return medias.map((media) => <Media key={media.id} data={media} />)
            }

        }
        
    }



    return(
        <section id="medias-list">
        {isLoading ?
            <Loading />
            : render()
            /*medias.length == 0 ?
                <>
                <p>Aucun media n'a été posté pour le moment</p>
                <p>Serez-vous le premier ou la première ?</p>
                </>
            :
            medias.map((media) => {return <Media key={media.id} data={media} />})*/
        }
        
        </section>
    )
}



export default MediasList;