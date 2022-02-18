
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Field from "./Field.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import useFetch from "../../utils/fetch";
import Loading from '../components/Loading.jsx';

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
    const urlUpdatePicture = `http://localhost:3000/api/users/${userId}/update/picture`;
    


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

            setErrorMessage("");
            setIsLoading(true);
        
            if ( fields["profil-image"].isValid ) {

                let formData = new FormData();        
                formData.append("image", fields["profil-image"].value)
                formData.append("urlProfil", urlProfil)


                let options = {
                    method : 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization' : 'Bearer '+token
                    },
                    body : formData
                }

                try{
                    
                    let response = await useFetch(urlUpdatePicture, options);
                    
                    setIsLoading(false)
                    dispatch({type : 'SET_USER_PICTURE', value : response.newUrlProfil })
                    reset();
                    
                } catch (err){

                    setIsLoading(false)
                    setError(err.message)
                    console.log(err.message)
                }


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


    return (
        <form method="post" action="#" className="profil__form">

            <Field
                label="votre photo"
                type="file"
                name="profil-image"
                returnValueToForm={handleChange}
                formName="profil"
            />

            <div className="profil__form__buttons">

                <ButtonSubmit onClick={submit} />
                <button className="like-submit" onClick={()=> hideForm()}>annuler</button>

            </div>
            {isLoading ? <Loading /> : null }
            {error != "" ? <p className="error">{ error }</p> : null}
            

        </form>
    )
}


export default ProfilFormChangeImage;

