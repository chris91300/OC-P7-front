
import React, { useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";

import ProfilFormChangeImage from "./ProfilFormChangeImage.jsx";


/**
 * Component allow to change the picture of the profil user
 */
const ProfilChangeImage = ()=>{


    const [ showForm, setShowForm ] = useState(false);

      

    /**
     * return the good component
     */
    const renderComponents = ()=>{
        
        if ( showForm ) {

            return <ProfilFormChangeImage hideForm={ ()=>setShowForm(false) }/>;

        } else {

            return <button
                        className="btn__no-style"
                        onClick={()=>setShowForm(true) }
                    >
                        <BsFillCameraFill />modifier votre photo de profil
                    </button>

        }
    }


    return(
        <div className="profil__change__image">  
            {renderComponents()}       
        </div>
    )

}


export default ProfilChangeImage;