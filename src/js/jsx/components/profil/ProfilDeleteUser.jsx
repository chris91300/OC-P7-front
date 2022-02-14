
import React from "react";
import { useState } from "react";
import { FaUserAltSlash } from "react-icons/fa";

import ProfilFormDeleteUser from "./ProfilFormDeleteUser.jsx";


/**
 * Contain the possibility to delete the user profil
 */
const ProfilDeleteUser = ()=>{

    const [ showForm, setShowForm ] = useState(false);

  

    
    /**
     * return the good component
     */
    const renderComponents = ()=>{
        
        if ( showForm ) {

            return <ProfilFormDeleteUser hideForm={ ()=>setShowForm(false) }/>;

        } else {

            return <button
                        className="btn__no-style"
                        onClick={()=>setShowForm(true) }
                    >
                        <FaUserAltSlash />supprimer votre profil
                    </button>

        }
    }


    return(
        <div className="profil__delete__user">  
            {renderComponents()}       
        </div>
    )



}


export default ProfilDeleteUser;