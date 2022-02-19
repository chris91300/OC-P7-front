
import React from "react";
import { useSelector } from "react-redux";

import AppLayout from "../layout/AppLayout.jsx";
import Menus from "../components/Menus.jsx";


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