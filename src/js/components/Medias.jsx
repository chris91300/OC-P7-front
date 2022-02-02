
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CreateMedia from "./CreateMedia.jsx";
import Footer from "./Footer.jsx";
import HeaderApp from "./HeaderApp.jsx";


const Medias = ()=>{

    const user = useSelector((state) => state.user);


    useEffect(()=>{}, [])



    return(
        <>
        <HeaderApp admin={user.admin} />
        <main>
            <h1>FORUM MULTIMEDIAS</h1>
            <CreateMedia />
        </main>
        <Footer />
        </>
    ) 
}


export default Medias;