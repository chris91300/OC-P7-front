
import React from "react";
import { useState } from "react";
import ButtonSimple from "../components/ButtonSimple.jsx";
import NavMenu from "./NavMenu.jsx";


/**
 * the navigation container for mobile
 */
const MenuMobile = ( { status, hideMenuForMobile } )=>{

    //const [ className, setClassName ] = useState(status);

    /**
     * hide the navigation container
     */
   /* const hideMenu = ()=>{
        setClassName("hide");
    }*/

    return(
        <aside className={`nav__menu__mobile ${status}`}>
            <ButtonSimple onClick={()=> hideMenuForMobile("hide")} className="nav__menu__mobile__button-hide" >X</ButtonSimple>
            <NavMenu />
        </aside>
        
    )
}



export default MenuMobile;