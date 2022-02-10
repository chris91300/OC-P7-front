
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppLayout from "./AppLayout.jsx";
import Footer from "./Footer.jsx";
import HeaderApp from "./HeaderApp.jsx";
import MenuMobile from "./MenuMobile.jsx";
import Menus from "./Menus.jsx";


/**
 * the page menu
 */
const Menu = ()=>{

    const admin = useSelector((state) => state.user.admin);
    

    return(        
        <AppLayout title="MENU">
            <Menus admin={admin} />
        </AppLayout> 
    ) 
}


export default Menu