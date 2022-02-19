
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import Footer from "../layout/Footer.jsx";
import FormLogin from "../form/FormLogin.jsx";
import FormSignup from "../form/FormSingup.jsx";
import HeaderAccueil from "../layout/HeaderAccueil.jsx";
import Loading from '../components/Loading.jsx';
import requestSelf from "../../utils/requestSelf.js";
import requestApi from "../../utils/requestApi.js";



/**
 * the home page
 * with the two form for signup and login
 */
const Accueil = ()=>{

    const [ className, setClassName ] = useState("");
    const [ isLoading, setLoading ] = useState(true);
    const [ sessionExist, setSessionExist ] = useState(false);
    const dispatch = useDispatch()


   /**
     * when the component did mount
     * check if there is a session not expired
     * if there is one, loginUser()
     * else nothing
     */
    useEffect( async ()=>{
        
        try{
            
            let response = await requestSelf({
                entity : 'session',
                request : 'get'
            });
            
            if ( response.sessionIsOk) {
                
                let user = response.user;
                if ( user.pseudo != "" & user.password != "" ) {
                    
                    setSessionExist(true);
                    loginUser(user.pseudo, user.password);
                }
            } else {
                
                setSessionExist(false);
                setLoading(false);
            }
            

        } catch(err){
            
            setSessionExist(false);
            setLoading(false);

        } finally{

            return ()=>{}

        }
        
    }, [])
    
    /**
     * change the class name of the login form 
     * in orde to show or hide the form
     * on click on "s'inscrire" or "se connecter"
     * @param {string} action 
     */
    const changeClass = (action) => {
        if (/^show|hide$/.test(action))
        {
            if ( !(action === "show" && className === "" ) ) {
                setClassName(action)
            }
            
        }
    }



    /**
     * if there is an session, we log in user
     * @param {string} pseudo user pseudo
     * @param {string} password user password
     */
    const loginUser = async (pseudo, password)=>{
        console.log("on login user")
        let body = {
            pseudo : pseudo,
            password : password
        }

        body = JSON.stringify(body)


        try{

            let user = await requestApi({
                entity : 'users',
                request : 'login',
                body : body
            })

            dispatch({type : "SET_USER", value : user});

            let response = await requestSelf({
                entity : 'session',
                request : 'set',
                body : body
            });        
           
            setLoading(false);
            

        } catch (err){
            
            setSessionExist(false);
            setLoading(false);

        }
        
    }



    /**
     * if there is an session, redirect to menu page
     * else render the forms
     */
    const render = ()=>{
        if ( sessionExist ){
            
            return <Navigate to="/menu" />

        } else {
            
            return(
                <>
                    <HeaderAccueil changeClass={ changeClass }/>
                    <main>
                        <h1>BIENVENUE SUR GROUPOMANIA</h1>
                        <div className="forms">
                            <FormSignup name="signup"/>
                            <FormLogin name="login" className={className}/>
                        </div>
                    </main>
                    <Footer />
                </>
            )

        }
    }



    /**
     * if the session is loading
     * return the loading component
     */
    const loading = ()=>{

        return(
            <div className="loading__container">
                <Loading />
            </div>
        )
    }


    return(
        <>
            {isLoading ? loading() : render()}
        </>
    )
}


export default Accueil