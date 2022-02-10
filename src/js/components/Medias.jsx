
import React from "react";
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
        <>
        <HeaderApp />
        <main>
            <h1>FORUM MULTIMEDIAS</h1>
            <div className="main__container">
                <ProfilAside />
                <div className="main__container__section">
                    <CreateMedia />
                    <MediasList />   
                </div>
            </div>          
        </main>
        <Footer />
        </>
    ) 
}


export default Medias;