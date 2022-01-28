import React from 'react';
import { HeaderAccueil } from "./HeaderAccueil.jsx";
const Title = ()=>{
    return <h1>bienvenue dans l'application Groupomania</h1>
}

console.log(HeaderAccueil)
export function App(){

    return(
        <>
        <HeaderAccueil/>
        <Title/>
        </>
    )
}