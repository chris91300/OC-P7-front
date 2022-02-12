
import React from "react";
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";

import ButtonSimple from "./ButtonSimple.jsx";


const MediaReportedButtons = ( { id } )=>{


    const removeReported = ()=>{
        console.log("remove reported");
    }

    const deleteMedia = ()=>{
        console.log("delete media");
    }


    return(
        <div className="media-reported__buttons">
            <ButtonSimple onClick={removeReported}><FaRegFlag />retirer le signalement</ButtonSimple>
            <ButtonSimple onClick={deleteMedia}><FaRegTrashAlt />supprimer le media</ButtonSimple>
        </div>
    )
}


export default MediaReportedButtons;