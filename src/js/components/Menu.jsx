
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "./Footer.jsx";
import HeaderApp from "./HeaderApp.jsx";
import Menus from "./Menus.jsx";


const Menu = ()=>{

    const user = useSelector((state) => state.user);


    useEffect(()=>{}, [])



    return(
        <>
        <HeaderApp />
        <main>
            <h1>MENU</h1>
            <Menus admin={user.admin} />
        </main>
        <Footer />
        </>
    ) 
}


export default Menu