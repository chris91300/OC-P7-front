
import React from "react";
import logo from '../../../img/logo.png';
import NavMenu from "./NavMenu.jsx";
import ProfilImage from "../components//ProfilImage.jsx";


/**
 * the header element for the application
 * @param {function} showMenuForMobile a callback. allow to show the navigation for smartphone
 */
const HeaderApp = ( { showMenuForMobile } )=>{


    return(
        <>
        <header>
            <img src={logo}></img>
            <nav>
                <div className="nav__mobile" onClick={()=> showMenuForMobile("show")}>
                    <ProfilImage />
                </div>

                <NavMenu />              
            </nav>
        </header>

        </>
    )

}


export default HeaderApp;