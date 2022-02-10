
import React from "react";
import logo from '../../img/logo.png';
import NavMenu from "./NavMenu.jsx";
import ProfilImage from "./ProfilImage.jsx";



const HeaderApp = ( { showMenuForMobile } )=>{

    
    const disconnect = (  )=>{
        console.log("on se déconnecte")
    }

    return(
        <>
        <header>
            <img src={logo}></img>
            <nav>
                <div className="nav__mobile" onClick={()=> showMenuForMobile()}>
                    <ProfilImage />
                </div>

                <NavMenu />              
            </nav>
        </header>

        </>
    )

}


export default HeaderApp;