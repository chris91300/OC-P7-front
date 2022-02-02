
import React, { useState } from "react";
import Footer from "./Footer.jsx";
import FormLogin from "./FormLogin.jsx";
import FormSignup from "./FormSingup.jsx";
import HeaderAccueil from "./HeaderAccueil.jsx";



const Accueil = ()=>{

    const [ className, setClassName ] = useState("");
    
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