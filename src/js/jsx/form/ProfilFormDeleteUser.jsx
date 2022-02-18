
import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import ButtonSubmit from "./ButtonSubmit.jsx"
import useFetch from "../../utils/fetch";
import Loading from '../components/Loading.jsx';


/**
 * form for remove definitively the user of the database
 * @param {function} hideForm  callback allow to hide the form
 */
const ProfilFormDeleteUser = ( { hideForm } )=>{

    const user = useSelector( ( state ) => state.user);
    const [ disconnected, setDisconnected ] = useState(false);
    const [ error, setError ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const dispatch = useDispatch();
    const userId = user.id;
    const token = user.token;

    const urlProfil = user.urlProfil;
    const urlDeleteUser = `http://localhost:3000/api/users/${userId}/delete`;


    /**
     * submit the form in order to delete user
     * @param {object} e the event object
     */
    const submit = async (e) => {
        e.preventDefault();
        
        if ( !isLoading ) {

            setErrorMessage("");
            setIsLoading(true)
        

            let body = {
                urlProfil : urlProfil
            }
            
            let options = {
                method : 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+token
                },
                body : JSON.stringify(body)
            }

            try{
                
                let response = await useFetch(urlDeleteUser, options)            
                
                setIsLoading(false);
                disconnect();
                
            } catch (err){

                setIsLoading(false);
                setError(err.message)
                console.log(err.message)
            }
        }
    }

     /**
     * disconnect the user after deleted him
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
            setDisconnected(true)
        }
    }



    /**
     * return the form
     */
    const renderForm = ()=>{

        return(
            <form method="delete" action="#" className="profil__form">
    
                <p>Tous les médias et commentaires que vous avez postés seront supprimés.</p>
                <p>Êtes-vous sûre de vouloir supprimer votre profil ?</p>
    
                <div className="profil__form__buttons">
    
                    <ButtonSubmit onClick={submit} value="supprimer"/>
                    <button className="like-submit" onClick={()=> hideForm()}>annuler</button>
    
                </div>  
                {isLoading ? <Loading /> : null }    
                { error != "" ? <p className="error">{ error }</p> : null }
    
                    
    
            </form>
        )
    }

    return(
        <>
        {disconnected ? <Navigate to="/" /> : renderForm()}
        </>
    )
}

export default ProfilFormDeleteUser;