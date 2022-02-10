
import React from "react";
import { useState } from "react";
import Footer from "./Footer.jsx";
import HeaderApp from "./HeaderApp.jsx";
import MenuMobile from "./MenuMobile.jsx";


/**
 * the layout of the application
 */
const AppLayout = ( { title, children } )=>{

    
    const [ showMenuMobile, setshowMenuMobile ] = useState(false)
   

    /**
     * show or hide navigation container for mobile
     */
    const showMenuForMobile = ()=>{
        let show = showMenuMobile ? false : true;
        setshowMenuMobile(show);
    }

    return(
        <>
        <HeaderApp showMenuForMobile={ showMenuForMobile }/>
        <main>
            <h1>{ title }</h1>
            {children}
            {showMenuMobile ? <MenuMobile /> : null }
        </main>
        <Footer />
        </>
    ) 
}


export default AppLayout