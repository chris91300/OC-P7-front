
import React from "react";
import AppLayout from "./AppLayout.jsx";
import CreateMedia from "./CreateMedia.jsx";
import Footer from "./Footer.jsx";
import HeaderApp from "./HeaderApp.jsx";
import MediasList from "./MediasList.jsx";
import ProfilAside from "./ProfilAside.jsx";


/**
 * the medias page
 */
const Medias = ()=>{
    console.log("on est dans medais")
    
    return(
        <AppLayout title="FORUM MULTIMEDIAS">
            <div className="main__container">
                <ProfilAside />
                <div className="main__container__section">
                    <CreateMedia />
                    <MediasList />   
                </div>
            </div> 
        </AppLayout>
    ) 
}


export default Medias;