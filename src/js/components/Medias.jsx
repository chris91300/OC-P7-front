
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CreateMedia from "./CreateMedia.jsx";
import Footer from "./Footer.jsx";
import HeaderApp from "./HeaderApp.jsx";
import Loading from "./Loading.jsx";
import MediasList from "./MediasList.jsx";
import ProfilAside from "./ProfilAside.jsx";


const Medias = ()=>{

    
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