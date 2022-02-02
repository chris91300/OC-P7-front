import React from 'react';
import logo from '../../img/logo.png';
import ButtonSimple from './ButtonSimple.jsx';



const HeaderAccueil = ( { changeClass } ) => {

    const onClick = (name)=>{
        if ( name === "s'inscrire") {
            changeClass("hide");
        }
        if ( name === "se connecter") {
            changeClass("show");
        }
        
    }

    return(
        <>
        <header>
            <img src={logo}></img>
            <nav>
                <ButtonSimple title="inscription" onClick={onClick}>s'inscrire</ButtonSimple>
                <ButtonSimple title="se connecter" onClick={onClick}>se connecter</ButtonSimple>
            </nav>
        </header>

        </>
    )
}


export default HeaderAccueil;