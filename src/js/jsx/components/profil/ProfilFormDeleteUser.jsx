
import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ButtonSubmit from "../../form/ButtonSubmit.jsx"
import useFetch from "../../../utils/fetch.js";
import { useDispatch } from "react-redux";



const ProfilFormDeleteUser = ( { hideForm } )=>{

    const user = useSelector( ( state ) => state.user);
    const [ disconnected, setDisconnected ] = useState(false);
    const dispatch = useDispatch();
    const userId = user.id;
    const token = user.token;
    const urlDeleteUser = `http://localhost:3000/api/users/${userId}/delete`;


    const submit = async (e) => {
        e.preventDefault();
        console.log("on delete user")

        let options = {
            method : 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer '+token
            }
        }

        try{
            
            let response = await useFetch(urlDeleteUser, options)            
            
            disconnect();
            
        } catch (err){
            setError(err.message)
            console.log(err.message)
        }
    }

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



    const renderForm = ()=>{

        return(
            <form method="delete" action="#" className="profil__form">
    
                <p>Tous les médias et commentaires que vous avez postés seront supprimés.</p>
                <p>Êtes-vous sûre de vouloir supprimer votre profil ?</p>
    
                <div className="profil__form__buttons">
    
                    <ButtonSubmit onClick={submit} value="supprimer"/>
                    <button className="like-submit" onClick={()=> hideForm()}>annuler</button>
    
                </div>      
    
                    
    
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