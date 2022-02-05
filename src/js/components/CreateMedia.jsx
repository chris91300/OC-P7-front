
import React, { useState } from "react";
import FormCreateMedia from "./form/FormCreateMedia.jsx";
import ProfilImage from "./ProfilImage.jsx";
import { FaPlusCircle } from "react-icons/fa"



const CreateMedia = ()=>{


    const [showForm, setShowForm ] = useState(false);

    const handleClick= ()=>{
        if ( showForm ) {
            setShowForm(false);
        } else {
            setShowForm(true);
        }
    }

    return(
        <section id="section_create_media" className="create-media">
            <div className="create-media__title">
                <FaPlusCircle />
                <h2 title="faire apparaître le formulaire pour ajouter un media" onClick={handleClick}>AJOUTER UN MEDIA</h2>
            </div>
            <div className="create-media__form">
                {showForm? <FormCreateMedia name="create_media" /> : null}
            </div>
        </section>
    )
}



export default CreateMedia;