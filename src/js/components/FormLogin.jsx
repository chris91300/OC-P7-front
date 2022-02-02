
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Field from "./Field.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import formFields from "../utils/formFields";
import useFetch from "../utils/fetch.js";
import { useDispatch } from "react-redux";



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

const FormLogin = ( { name, className } ) => {

    const loginUserUrl = "http://localhost:3000/api/users/login";
    const urlMenu = "/menu";

    const [ redirect, setRedirect ] = useState(false);
    const [ fields, setFields] = useState({...defautlFields})
    const [ errorMessage, setErrorMessage ] = useState("");
    const user = useSelector((state)=> state.user);
    
    const dispatch = useDispatch();
    useEffect( () => {
        //console.log("user a changé")
        //console.log(user)
        if ( user.pseudo != "" & user.password != "" ) {
            //console.log("on est dans le use effect")
            let newFields = {...fields};
            fields.pseudo.value = user.pseudo;
            fields.pseudo.isValid = true;
            fields.password.value = user.password;
            fields.password.isValid = true;
            setFields(newFields);
            loginUser();
        }

    }, [user])
    


    const changeFields = (name, value, isValid) => {
        let newFields = {...fields};
        fields[name].value = value;
        fields[name].isValid = isValid;
        setFields(newFields);
    }

    const submit = (e) => {
        e.preventDefault();
        if (
            fields.pseudo.isValid &
            fields.password.isValid
            ) {
                console.log("login user ok AAA")
                loginUser();
            } else {
                let formIsValid = checkInput();
                if (formIsValid){
                    console.log("on verifie le fields")
                    console.log(fields)
                    loginUser();
                } else {
                    console.log("form non valide même après verif")
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
            let element = document.getElementsByName(key)[0];
            let value = element.value;

            
            if ( !formFields[key].regex.test(value)){
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


    const loginUser = async ()=>{
        //console.log("login user")
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
            //console.log(user);

            dispatch({type : "SET_USER", value : user})
            setRedirect(true)
            

        } catch (err){
            setErrorMessage(err.message)
            console.log(err.message)
        }
        
    }


    const form = ()=>{

        if ( redirect ) {
            console.log("on fait une redirect")
            return <Navigate to={urlMenu} />
            
        } else {
            console.log("pas de redirection")
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
//<div id="form__slide__container" className=""></div>

export default FormLogin;