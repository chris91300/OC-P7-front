
import React from "react";
import { useSelector } from "react-redux";
import { BsFillCameraFill } from "react-icons/bs";
import Input from '../../form/Input.jsx';
import { useState } from "react";
import ProfilFormChangeImage from "./ProfilFormChangeImage.jsx";

const ProfilChangeImage = ()=>{


    const user = useSelector( ( state ) => state.user );
    const { lastName, firstName, pseudo, urlProfil } = user;
    const [ showForm, setShowForm ] = useState(false);

  

    

    const renderComponents = ()=>{
        console.log("showform => "+showForm)
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