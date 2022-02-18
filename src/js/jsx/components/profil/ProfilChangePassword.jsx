
import React, { useState } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";

import ProfilFormChangePassword from "../../form/ProfilFormChangePassword.jsx";


/**
 * Component allow to change the user password
 */
const ProfilChangePassword = ()=>{


    const [ showForm, setShowForm ] = useState(false);

      

    /**
     * return the good component
     */
    const renderComponents = ()=>{
        
        if ( showForm ) {

            return <ProfilFormChangePassword hideForm={ ()=>setShowForm(false) }/>;

        } else {

            return(
                <div className="profil__data profil-item">
                    <BsFillShieldLockFill />
                    <button className="btn__no-style" onClick={()=>setShowForm(true) }>
                        modifier votre mot de passe
                    </button>
                </div>
            )

        }
    }


    return(
        <div className="profil__change__password">  
            {renderComponents()}       
        </div>
    )

}


export default ProfilChangePassword;