
import React, { useState } from "react";
import FormCreateMedia from "./form/FormCreateMedia.jsx";
import { FaPlusCircle } from "react-icons/fa"


/**
 * Component CreateMedia
 * allow to show or hide the formCreateMedia */
const CreateMedia = ()=>{


    const [showForm, setShowForm ] = useState(false);


    /**
     * when user click on the title
     * show or hide the form
     */
    const handleClick= ()=>{
        if ( showForm ) {
            setShowForm(false);
        } else {
            setShowForm(true);
        }
    }

    return(
        <section id="section_create_media" className="create-media">
            <div className="create-media__title" onClick={handleClick}>
                <FaPlusCircle />
                <h2 title="faire apparaître le formulaire pour ajouter un media" >AJOUTER UN MEDIA</h2>
            </div>
            <div className="create-media__form">
                {showForm? <FormCreateMedia name="create_media" handleClick={handleClick}/> : null}
            </div>
        </section>
    )
}



export default CreateMedia;