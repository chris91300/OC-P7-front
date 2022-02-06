

import React, { useState, useEffect } from "react";
import Field from "./Field.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import formFields from "../../utils/formFields";
import { useDispatch } from "react-redux";
import useFetch from "../../utils/fetch.js";

// default user value
const defautlFields = {
    lastName : {
        value : "",
        isValid : false
    },
    firstName : {
        value : "",
        isValid : false
    },
    pseudo : {
        value : "",
        isValid : false
    },
    email : {
        value : "",
        isValid : false
    },
    password : {
        value : "",
        isValid : false
    }
}


/**
 * Form Sign up. 
 * @param {string} name: the form name (here signup)
 * @returns 
 */
const FormSignup = ( { name } ) => {

    const signupUserUrl = "http://localhost:3000/api/users/signup";

    const [ fields, setFields] = useState({...defautlFields})
    const [ errorMessage, setErrorMessage ] = useState("");
    const dispatch = useDispatch();


    useEffect(()=>{
        let body = document.body;
        console.log("on ajout le keypress event dans sign up")
        body.addEventListener("keyup", keyPressEvent);

        return ()=>{ body.removeEventListener("keyup", keyPressEvent);}
    }, [])

    /**
     * if user press Enter key,
     * if the login form is showed, we check the inputs value
     * else nothing
     * @param {object} e the event object
     */
    const keyPressEvent = (e)=>{
        
        let container = document.getElementById("animated_container");
        let containerClass = container.className;
        
        if ( e.key === 'Enter' & containerClass === 'hide')
        {
            
            submit(e);

        }
    }

    const changeFields = (name, value, isValid) => {
        let newFields = {...fields};
        fields[name].value = value;
        fields[name].isValid = isValid;
        setFields(newFields);
    }

    const submit = (e) => {
        e.preventDefault();
        if (
            fields.lastName.isValid &
            fields.firstName.isValid &
            fields.pseudo.isValid &
            fields.email.isValid &
            fields.password.isValid
            ) {
                signupUser();
            } else {
                let formIsValid = checkInput();
                if (formIsValid){
                    signupUser();
                } else {
                    
                    setErrorMessage("formulaire non valide.");
                }
                
            }


    }

    /**
     * second verification due to auto fill of the input by navigator
     * in this case, some input change but have no onBlur event
     * @returns if the form is valid : true | false
     */
    const checkInput = () => {
        let formIsValid = true;
        let newFields = {...fields};
        Object.entries(defautlFields).map(( [ key, data ]) => {
            let element = document.getElementById(name+"_"+key);
            let value = element.value;
            
            if ( formFields[key].regex.test(value)){
                fields[key].value = value;
                fields[key].isValid = true;
                
            } else {
                fields[key].value = value;
                fields[key].isValid = false;
                formIsValid = false;
            }

        })
        setFields(newFields);
        return formIsValid;
    }



    const signupUser = async ()=>{
        let body = {
            lastName : fields.lastName.value,
            firstName : fields.firstName.value,
            pseudo : fields.pseudo.value,
            email : fields.email.value,
            password : fields.password.value
        }

        let options = {
            method : 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        }

        try{
            let response = await useFetch(signupUserUrl, options)
            
            let user = {
                lastName : response.lastName,
                firstName : response.firstName,
                pseudo : response.pseudo,
                userId : response.id,
                createdAt : response.createAt,
                password : fields.password.value
            }

            dispatch({type : 'SET_USER', value : user})

        } catch (err){
            setErrorMessage(err.message)
            console.log(err.message)
        }
        
    }




    return (
        <form method="post" action="#">
            <h2>S'INSCRIRE</h2>
            <Field label="Nom" type="text" name="lastName" formName={name} returnValueToForm={changeFields} />
            <Field label="Prénom" type="text" name="firstName" formName={name} returnValueToForm={changeFields} />
            <Field label="Pseudo" type="text" name="pseudo" formName={name} returnValueToForm={changeFields} />
            <Field label="Email" type="email" name="email" formName={name} returnValueToForm={changeFields} />
            <Field label="Password" type="password" name="password" formName={name} returnValueToForm={changeFields} />
            <ButtonSubmit onClick={submit} />
            <p className="form__error">{ errorMessage }</p>
        </form>
        
    )
}


export default FormSignup;