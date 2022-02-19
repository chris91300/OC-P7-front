
import React from "react";
import AppLayout from "../layout/AppLayout.jsx";
//import ProfilAside from "../layout/ProfilAside.jsx";
import Profil from "../components/Profil.jsx";


const PageProfil = ()=>{

    


    return(
        <AppLayout title="VOTRE PROFIL">
            <div className="main__container">
                
                <div className="main__container__section section-profil">
                    <Profil />
                       
                </div>
                
            </div> 
        </AppLayout>
    )
}


export default PageProfil;