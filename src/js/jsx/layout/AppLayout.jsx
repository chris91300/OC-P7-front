
import React from "react";
import { useState } from "react";
import Footer from "./Footer.jsx";
import HeaderApp from "./HeaderApp.jsx";
import MenuMobile from "./MenuMobile.jsx";


/**
 * the layout of the application
 */
const AppLayout = ( { title, children } )=>{

    
    const [ showMenuMobile, setshowMenuMobile ] = useState("hide")
   

    /**
     * show or hide navigation container for mobile 
     */
    const toogleMenuForMobile = (status)=>{
        //let show = showMenuMobile ? false : true;
        setshowMenuMobile(status);
    }

    return(
        <>
        <HeaderApp showMenuForMobile={ toogleMenuForMobile }/>
        <main>
            <h1>{ title }</h1>
            {children}
            <MenuMobile status={showMenuMobile} hideMenuForMobile={ toogleMenuForMobile }/>
        </main>
        <Footer />
        </>
    ) 
}


export default AppLayout