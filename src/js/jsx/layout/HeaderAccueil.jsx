import React from 'react';

import logo from '../../../img/logo.png';
import ButtonSimple from '../components/ButtonSimple.jsx';


/**
 * the component HeaderAccueil
 * the Header of the page of the accueil
 * @param {function} changeClass send to the Accueil component the new class of the form formLogin
 * @returns 
 */
const HeaderAccueil = ( { changeClass } ) => {


    /**
     * allow to show or hide the form login
     * @param {string} name the name of the button on which one the user clicked
     */
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
        <header id="header_accueil">
            <img src={logo} alt="logo de groupomania"></img>
            <nav>
                <ButtonSimple title="inscription" onClick={onClick}>s'inscrire</ButtonSimple>
                <ButtonSimple title="se connecter" onClick={onClick}>se connecter</ButtonSimple>
            </nav>
        </header>

        </>
    )
}


export default HeaderAccueil;