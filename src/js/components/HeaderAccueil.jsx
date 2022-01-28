import React from 'react';
import logo from '../../img/icon.png';
console.log(logo)
export function HeaderAccueil(){

    return(
        <>
        <header>
            <img src={logo}></img>
            <div>
                <p>s'inscrire</p>
                <p>se connecter</p>
            </div>
        </header>

        </>
    )
}