
import React, { useState } from "react";
import Footer from "./Footer.jsx";
import FormLogin from "./form/FormLogin.jsx";
import FormSignup from "./form/FormSingup.jsx";
import HeaderAccueil from "./HeaderAccueil.jsx";


/**
 * the home page
 * with the two form for signup and login
 */
const Accueil = ()=>{

    const [ className, setClassName ] = useState("");
    
    /**
     * change the class name of the login form 
     * in orde to show or hide the form
     * on click on "s'inscrire" or "se connecter"
     * @param {string} action 
     */
    const changeClass = (action) => {
        if (/^show|hide$/.test(action))
        {
            if ( !(action === "show" && className === "" ) ) {
                setClassName(action)
            }
            
        }
    }


    return(
        <>
            <HeaderAccueil changeClass={ changeClass }/>
            <main>
                <h1>BIENVENUE SUR GROUPOMANIA</h1>
                <div className="forms">
                    <FormSignup name="signup"/>
                    <FormLogin name="login" className={className}/>
                </div>
            </main>
            <Footer />
        </>
    )
}


export default Accueil