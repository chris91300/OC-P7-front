
import React from "react";
import { Link } from "react-router-dom";
import logo from '../../img/logo.png';
import ButtonSimple from './ButtonSimple.jsx';



const HeaderApp = ( { admin } )=>{

    const goToProfil = ()=>{
        console.log("go to profil")
    }


    const disconnect = ()=>{
        console.log("on se déconnecte")
    }

    return(
        <>
        <header>
            <img src={logo}></img>
            <nav>
                {admin ? <Link to="/dashboard">dashboard</Link> : null}
                <ButtonSimple title="voir mon profil" onClick={goToProfil}>profil</ButtonSimple>
                <ButtonSimple title="se déconnecter" onClick={disconnect}>se déconnecter</ButtonSimple>
            </nav>
        </header>

        </>
    )

}


export default HeaderApp;