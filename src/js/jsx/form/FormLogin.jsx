
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Field from "./Field.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import formFields from "../../utils/formFields";
import useFetch from "../../utils/fetch.js";
import { useDispatch } from "react-redux";


// default user value
const defautlFields = {
    pseudo : {
        value : "",
        isValid : false
    },
    password : {
        value : "",
        isValid : false
    }
}


/**
 * Form Login. 
 * @param {string} name: the form name (here login)
 * @param {string} className the className of the container of the form (animated_container)
 * @returns 
 */
const FormLogin = ( { name, className } ) => {

    const loginUserUrl = "http://localhost:3000/api/users/login";
    const urlMenu = "/menu";

    const [ redirect, setRedirect ] = useState(false);
    const [ fields, setFields] = useState({...defautlFields})
    const [ errorMessage, setErrorMessage ] = useState("");
    const user = useSelector((state)=> state.user);    
    const dispatch = useDispatch();

    /**
     * check if user in the store (reducer) has changed
     * user changed if is a new user. he signed up and if his sign up is ok
     * ths login is automatic
     */
    useEffect( () => {

        if ( user.pseudo != "" & user.password != "" ) {

            
            let newFields = {...fields};
            fields.pseudo.value = user.pseudo;
            fields.pseudo.isValid = true;
            fields.password.value = user.password;
            fields.password.isValid = true;
            setFields(newFields);
            loginUser();
            
        }

    }, [user])

    /**
     * when the component did mount
     * add the event type keyup the the body in order to manage
     * when user press 'Enter' key
     */
    useEffect(()=>{

        let body = document.body;        
        body.addEventListener("keyup", keyPressEvent);

        return body.removeEventListener("keyup", keyPressEvent);

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
        
        if ( e.key === 'Enter' & containerClass != 'hide')
        {
            
            submit(e);

        }
    }
    

    /**
     * set the inputs value in the fields object
     * @param {string} name the input name
     * @param {string} value the input value
     * @param {boolean} isValid if the value is valid
     */
    const changeFields = (name, value, isValid) => {
        let newFields = {...fields};
        fields[name].value = value;
        fields[name].isValid = isValid;
        setFields(newFields);
    }

    /**
     * on click on th esubmit button 
     * verifie if inputs value are valid
     * if form is valid, userLogin()
     * else show errorMessage
     * @param {object} e the event manager
     */
    const submit = (e) => {
        e.preventDefault();
        /*console.log("submit login")
        console.log("pseudo => "+fields.pseudo.value)
        console.log("pseudo is valid => "+fields.pseudo.isValid)
        console.log("password => "+fields.password.value)
        console.log("password is valid => "+fields.password.isValid)*/
        if (
            fields.pseudo.isValid &
            fields.password.isValid
            ) {
                //console.log("AAA")
                loginUser();

            } else {

                let formIsValid = checkInput();
                if (formIsValid){
                   // console.log("BBB")
                    loginUser();

                } else {
                   // console.log("CCC")
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
            //console.log(element)
            let value = element.value;
           /* console.log("on est dans LOGIN")
            console.log("key => " + key)
            console.log("value => " + value)
            console.log("regex => "+formFields[key].regex)*/
            
            if ( formFields[key].regex.test(value)){
               // console.log("valide")
                fields[key].value = value;
                fields[key].isValid = true;
                
            } else {
               // console.log("non valid")
                fields[key].value = value;
                fields[key].isValid = false;
                formIsValid = false;
            }

        })
       // console.log("le form est valid ? => "+formIsValid)
        setFields(newFields);
        return formIsValid;
    }


    /**
     * get inputs value and log in user
     */
    const loginUser = async ()=>{
        
        let body = {
            pseudo : fields.pseudo.value,
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

            let user = await useFetch(loginUserUrl, options)
            dispatch({type : "SET_USER", value : user})
            let response = await useFetch("/session/set", options)            
            setRedirect(true)
            

        } catch (err){
            setErrorMessage(err.message)
            console.log(err.message)
        }
        
    }


    /**
     * the form to put in reactDom
     */
    const form = ()=>{

        if ( redirect ) {
            
            return <Navigate to={"/voiture"} />
            
        } else {
            
            return (     
                <div id="animated_container" className={ className }>
                    <form method="post" action="#" id="form_login">
                        <h2>SE CONNECTER</h2>
                        <Field label="Pseudo" type="text" name="pseudo" formName={name} returnValueToForm={changeFields} />
                        <Field label="Password" type="password" name="password" formName={name} returnValueToForm={changeFields} />
                        <ButtonSubmit onClick={submit} />
                        <p className="form__error">{ errorMessage }</p>
                    </form>
                    
                </div>
                
            )
        }
    }




    return form();
}


export default FormLogin;