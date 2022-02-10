
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../../img/logo.png';
import ButtonSimple from './ButtonSimple.jsx';
import ProfilImage from "./ProfilImage.jsx";



const HeaderApp = ( { onClick } )=>{

    const admin = useSelector((state) => state.user.admin);
    
    

    const disconnect = ()=>{
        console.log("on se déconnecte")
    }

    return(
        <>
        <header>
            <img src={logo}></img>
            <nav>
                <div className="nav__mobile" onClick={onClick}>
                    <ProfilImage />
                </div>

                <div className="nav__bigger-than-mobile">
                    {admin ? <Link to="/dashboard">dashboard</Link> : null}
                    <Link to="/profil" title="voir mon profil" >profil</Link>
                    <ButtonSimple title="se déconnecter" onClick={disconnect}>se déconnecter</ButtonSimple>
                </div>                
            </nav>
        </header>

        </>
    )

}


export default HeaderApp;