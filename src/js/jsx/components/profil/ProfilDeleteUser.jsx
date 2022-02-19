
import React, { useState } from "react";
import { FaUserAltSlash } from "react-icons/fa";

import ProfilFormDeleteUser from "../../form/ProfilFormDeleteUser.jsx";


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

            return (
                <div className="profil__data profil-item">
                    <FaUserAltSlash />
                    <button className="btn__no-style" onClick={()=>setShowForm(true) } >
                        supprimer votre profil
                    </button>
                </div>

            )
            
            

        }
    }


    return(
        <div className="profil__delete__user">  
            {renderComponents()}       
        </div>
    )



}


export default ProfilDeleteUser;