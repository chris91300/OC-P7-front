

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useFetch from "../utils/fetch";
import Loading from "./Loading.jsx";


const MediasList = ()=>{

    const urlGetMedias = "http://localhost:3000/api/medias/";
    const [isLoading, setIsLoading ] = useState(true);
    const medias = useSelector((state) => state.medias);
    const dispatch = useDispatch();

    useEffect( async ()=>{
        let mediasList = await useFetch(urlGetMedias);
        console.log("dans use effect")
        console.log(mediasList)

        dispatch({
            type : "SET_MEDIAS",
            value : mediasList
        })
        setIsLoading(false)
    }, [])
    console.log("medias vaut")
    console.log(medias)


    const render = ()=>{

        if ( medias.length == 0 ) {
            return (
                <>
                <p>Aucun media n'a été posté pour le moment</p>
                <p>Serais vous le premier ou la première ?</p>
                </>
            
            )
        } else {
           // return <p>Il y a des medias</p>
            
            medias.map((media) => {
                console.log(media.id)

                return <p key={media.id} >id du media {media.id}</p>
            })
        }
    }

    return(
        <section id="medias-list">
        {isLoading ? <Loading /> : render()}
        </section>
    )
}



export default MediasList;