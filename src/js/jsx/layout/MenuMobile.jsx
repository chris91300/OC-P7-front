
import React from "react";
import { useState } from "react";
import ButtonSimple from "../components/ButtonSimple.jsx";
import NavMenu from "./NavMenu.jsx";


/**
 * the navigation container for mobile
 */
const MenuMobile = ( )=>{

    const [ className, setClassName ] = useState("show");

    /**
     * hide the navigation container
     */
    const hideMenu = ()=>{
        setClassName("hide");
    }

    return(
        <aside className={`nav__menu__mobile ${className}`}>
            <ButtonSimple onClick={hideMenu} className="nav__menu__mobile__button-hide" >X</ButtonSimple>
            <NavMenu />
        </aside>
        
    )
}



export default MenuMobile;