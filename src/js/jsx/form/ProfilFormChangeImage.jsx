
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Field from "./Field.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import Loading from '../components/Loading.jsx';
import useRequestApi from "../../utils/requestApi.js";

// default fields value
const defautlFields = {
    "profil-image" : {
        value : "",
        isValid : false
    }
}


/**
 * form for change the picture of the user profil
 * @param {function} hideForm callback for hide the form 
 * @returns 
 */
const ProfilFormChangeImage = ( { hideForm } )=>{
    
    const dispatch = useDispatch();
    const [ fields, setFields] = useState({...defautlFields});
    const [ error, setError ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const user = useSelector( ( state ) => state.user);
    const userId = user.id;
    const token = user.token;
    const urlProfil = user.urlProfil;
    


    /**
     * 
     * @param {string} name the input file name 
     * @param {object} file the picture that user want upload
     * @param {boolean} isValid if the value is valid or not
     */
    const handleChange = (name, file, isValid)=>{
        let newFields = {...fields};
        fields[name].value = file;
        fields[name].isValid = isValid;
        setFields(newFields);
    }


    /**
     * submit the form in order to change the picture of the user profil
     * @param {object} e the event object 
     */
    const submit = async (e)=>{
        e.preventDefault();

        if ( !isLoading ) {

            if ( fields["profil-image"].value != "" ) {

            
                setError("");
                setIsLoading(true);
            
                if ( fields["profil-image"].isValid ) {

                    let formData = new FormData();        
                    formData.append("image", fields["profil-image"].value)
                    formData.append("urlProfil", urlProfil)

                    try{
                        
                        let response = await useRequestApi({
                            entity : 'users',
                            request : 'updatePicture',
                            body : formData,
                            userId : userId,
                            token : token,
                            contentType : false
                        })
                        
                        setIsLoading(false)
                        dispatch({type : 'SET_USER_PICTURE', value : response.newUrlProfil })
                        reset();
                        
                    } catch (err){

                        setIsLoading(false)
                        setError(err.message)
                        console.log(err.message)
                    }


                }

            } else {
                setIsLoading(false)
                setError("merci de choisir une image")
            }
        }
    }


    /**
     * reset the form and hide this
     */
    const reset = ()=>{

        setFields({...defautlFields});
        hideForm()
    }


    /**
     * cancel the form
     * @param {object} e the event object
     */
    const cancel = (e)=>{
        e.preventDefault();
        hideForm();
    }

    return (
        <form method="post" className="profil__form">

            <Field
                label="votre photo"
                type="file"
                name="profil-image"
                returnValueToForm={handleChange}
                formName="profil"
            />

            <div className="profil__form__buttons">

                <ButtonSubmit onClick={submit} />
                <button className="like-submit" onClick={cancel}>annuler</button>

            </div>
            {isLoading ? <Loading /> : null }
            {error != "" ? <p className="error">{ error }</p> : null}
            

        </form>
    )
}


export default ProfilFormChangeImage;

