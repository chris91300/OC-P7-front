
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useFetch from "../../utils/fetch";
import Loading from "./Loading.jsx";
import Media from "./media/Media.jsx";



/**
 * Component MediaList
 * Container of all medias
 */
const MediasList = ()=>{

    const urlGetMedias = "http://localhost:3000/api/medias/";
    const [isLoading, setIsLoading ] = useState(true);
    const [error, setError ] = useState("");
    const medias = useSelector((state) => state.medias);
    const userToken = useSelector((state) => state.user.token)
    const dispatch = useDispatch();


    /**
     * when component did mount
     * get all the medias
     */
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

            return ()=>{}
        }
        
    }, [])


    
    /**
     * the the good component in terms of if there is
     * an error
     * or no media
     * or medias
     */
    const render = ()=>{
        if ( error != ""){
            return <p className="error">{error}</p>
        } else {
 
            let length = medias.length;

            if ( length == 0 ) {
                return (
                    <>
                    <p className="no-media">Aucun media n'a été posté pour le moment</p>
                    <p className="no-media">Serez-vous le premier ou la première ?</p>
                    </>
                
                )
            } else {

                let alone = length == 1 ? true : false;
                
               return medias.map((media) => <Media key={media.id} data={media} alone={alone} />)

            }

        }
        
    }



    return(
        <section id="medias-list">
        {isLoading ?
            <Loading />
            : render()
        }
        
        </section>
    )
}



export default MediasList;