
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Field from "./Field.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import useFetch from "../../utils/fetch.js";
import Loading from '../components/Loading.jsx';



// default fields value
const defautlFields = {
    "oldPassword" : {
        value : "",
        isValid : false
    },
    "newPassword" : {
        value : "",
        isValid : false
    },
    "verificationNewPassword" : {
        value : "",
        isValid : false
    }
}


/**
 * form for change password user
 * @param {function} hideForm callback for hide the form  
 */
const ProfilChangePassword = ( { hideForm } )=>{

    const [ fields, setFields] = useState({...defautlFields});
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const user = useSelector( ( state ) => state.user );
    const userId = user.id;
    const token = user.token;
    const urlChangePasswordUser = `http://localhost:3000/api/users/${userId}/update/password`;


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
     * verify the inputs value
     * if all are valid, sendNewPassword()
     * else show error message
     * @param {object} e the event object
     */
    const submit = (e) => {
        e.preventDefault();
        
        if ( !isLoading ) {

            setError("");
            setIsLoading(true);
        
            let oldPasswordIsValid = fields.oldPassword.isValid;
            let newPasswordIsValid = fields.newPassword.isValid;
            let verificationNewPasswordIsValid = fields.verificationNewPassword.isValid;
            let newPassword = fields.newPassword.value;
            let verificationNewPassword = fields.verificationNewPassword.value;

            if ( oldPasswordIsValid & newPasswordIsValid & verificationNewPasswordIsValid ) {

                if ( newPassword === verificationNewPassword ) {
                    
                    sendNewPassword();

                } else {
                    setIsLoading(false)
                    setError("la verification du mot de passe a échoué.");

                }
            } else {
                setIsLoading(false)
                setError("form non valid");

            }
        }

    }




    /**
     * send old password, new password and the verification of the new password to the API 
     * in order to update the password user
     */
    const sendNewPassword = async ()=>{

        let oldPassword = fields.oldPassword.value;
        let newPassword = fields.newPassword.value;
        let verificationNewPassword = fields.verificationNewPassword.value;

        let body = {
            oldPassword : oldPassword,
            newPassword : newPassword,
            verificationNewPassword : verificationNewPassword
        }        

        let options = {
            method : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+token
            },
            body : JSON.stringify(body)
        }

        try{

            let response = await useFetch(urlChangePasswordUser, options)

            setIsLoading(false)
            setError("");
            setSuccess(response.message);
            setTimeout(()=>{reset();}, 1500)

        } catch(err) {

            setIsLoading(false)
            setError(err.message);
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
        <form method="post" action="#" className="profil__form" id="profil_form_change_password">

            <Field
                label="ancien password"
                type="password"
                name="oldPassword"
                returnValueToForm={handleChange}
                formName="profil"
            />

            <Field
                label="nouveau password"
                type="password"
                name="newPassword"
                returnValueToForm={handleChange}
                formName="profil"
            />

            <Field
                label="vérification nouveau password"
                type="password"
                name="verificationNewPassword"
                returnValueToForm={handleChange}
                formName="profil"
            />  

            <div className="profil__form__buttons">

                <ButtonSubmit onClick={submit} />
                <button className="like-submit" onClick={()=> hideForm()}>annuler</button>

            </div>

            {isLoading ? <Loading /> : null }
            {error != "" ? <p className="error">{ error }</p> : null}
            {success != "" ? <p className="success">{ success }</p> : null}
            

        </form>
    )

}



export default ProfilChangePassword;