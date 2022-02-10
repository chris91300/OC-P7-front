
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import useFetch from "../../utils/fetch.js";
import ButtonSimple from "../components/ButtonSimple.jsx";


/**
 * Component NavMenu
 * Contain links and buttons to navigate on the application
 */
const NavMenu = ()=>{

    const admin = useSelector((state) => state.user.admin);
    const dispatch = useDispatch();
    const [ disconnected, setDisconnected ] = useState(false);

    /**
     * disconnect the user
     */
    const disconnect = async (  )=>{
        console.log("on se déconnecte")
        let options = {
            method : 'DELETE',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            }
        }

        try{
            let response = await useFetch("/session/delete", options)

            if ( response.status === "ok" ) {

                dispatch({
                    type : "RESET_STORE",
                    action : {}
                })
                setDisconnected(true)
            }
        } catch(err){
            console.log(err)
        }
    }


    const render = ()=>{

        return(
            <div className="nav__bigger-than-mobile">
                {admin ? <Link to="/admin/dashboard">dashboard</Link> : null}
                <Link to="/menu" title="voir la page des menus" >menus</Link>
                <Link to="/profil" title="voir mon profil" >profil</Link>
                <ButtonSimple title="se déconnecter" onClick={disconnect}>se déconnecter</ButtonSimple>
            </div> 
        )
    }


    return(
        <>
            {disconnected ? <Navigate to="/" /> : render()}
        </>
    )
        
    
}



export default NavMenu;