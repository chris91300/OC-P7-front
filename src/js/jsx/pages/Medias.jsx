
import React from "react";

import AppLayout from "../layout/AppLayout.jsx";
import CreateMedia from "../components/CreateMedia.jsx";
import MediasList from "../components/MediasList.jsx";
import ProfilAside from "../layout/ProfilAside.jsx";


/**
 * the medias page
 */
const Medias = ()=>{   
    
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