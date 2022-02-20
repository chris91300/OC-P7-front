
import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import ButtonSubmit from "./ButtonSubmit.jsx"
import Loading from '../components/Loading.jsx';
import requestSelf from "../../utils/requestSelf.js";
import requestApi from "../../utils/requestApi.js";


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


    /**
     * submit the form in order to delete user
     * @param {object} e the event object
     */
    const submit = async (e) => {
        e.preventDefault();
        
        if ( !isLoading ) {

            setError("");
            setIsLoading(true)
        

            let body = {
                urlProfil : urlProfil
            }
            body = JSON.stringify(body);            

            try{
                
                let response = await requestApi({
                    entity : 'users',
                    request : 'delete',
                    body : body,
                    userId : userId,
                    token : token
                })      
                
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

        try{
            
            let response = await requestSelf({
                entity : 'session',
                request : 'delete'
            })

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
     * cancel the form
     * @param {object} e the event object
     */
    const cancel = (e)=>{
        e.preventDefault();
        hideForm();
    }


    /**
     * return the form
     */
    const renderForm = ()=>{

        return(
            <form method="delete"  className="profil__form" id="form_delete_user" onSubmit={submit}>
    
                <p className="warning">Tous les médias et commentaires que vous avez postés seront supprimés.</p>
                <p className="warning">Êtes-vous sûre de vouloir supprimer votre profil ?</p>
    
                <div className="profil__form__buttons">
    
                    <ButtonSubmit onClick={submit} value="supprimer"/>
                    <button className="like-submit" onClick={cancel}>annuler</button>
    
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