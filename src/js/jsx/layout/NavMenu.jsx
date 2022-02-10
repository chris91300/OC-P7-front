
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonSimple from "../components/ButtonSimple.jsx";


/**
 * Component NavMenu
 * Contain links and buttons to navigate on the application
 */
const NavMenu = ()=>{

    const admin = useSelector((state) => state.user.admin);

    /**
     * disconnect the user
     */
    const disconnect = (  )=>{
        console.log("on se déconnecte")
    }


    return(
        <div className="nav__bigger-than-mobile">
            {admin ? <Link to="/admin/dashboard">dashboard</Link> : null}
            <Link to="/menu" title="voir la page des menus" >menus</Link>
            <Link to="/profil" title="voir mon profil" >profil</Link>
            <ButtonSimple title="se déconnecter" onClick={disconnect}>se déconnecter</ButtonSimple>
        </div> 
    )
}



export default NavMenu;