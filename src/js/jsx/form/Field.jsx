
import React, { useState } from "react";

import Input from "./Input.jsx";
import Label from "./Label.jsx";


/**
 * 
 * @param {string} label the input label 
 * @param {string} type  the input type  attribute
 * @param {string} name  the input name  attribute
 * @param {string} formName the form name  
 * @param {string} placeholder the input placeholder attribute
 * @param {function} returnValueToForm a callback. send the input value to the form 
 * @returns 
 */
const Field = ( { label, type, name, formName, placeholder="", returnValueToForm } ) => {

    const [ errorMessage, setErrorMessage ] = useState("");
    const [ fieldIsValid, setFieldIsValid ] = useState(false);// voir pour le supprimer car ne sert pas

    /**
     * hide the error message
     * on focus on the input
     */
    const onFocus = ()=>{
        setErrorMessage("");
    }


    /**
     * on blur on the input
     * send to the from with the callback returnValueToForm
     * the name, value and if the value is valid of the input
     * @param {boolean} isValid if the value is valid
     * @param {string} text the error message to show if the value is ot valid
     * @param {*} value the input value
     */
    const onBlur = (isValid, text, value) => {
        if ( isValid ) {

            setFieldIsValid(true);
            returnValueToForm(name, value, isValid)
            
        } else {

            setErrorMessage(text);
            setFieldIsValid(false);
            returnValueToForm(name, "", isValid)

        }
    }


    /**
     * return to the form the file of the input type file
     * @param {} file the picture ( media ) the user want to upload
     */
    const handleChange = (file) => {

        setFieldIsValid(true);
        returnValueToForm(name, file, true)
        
    }


    /**
     * render to the React DOM the good input element
     * in terms of is type
     */
    const renderInput = () => {

        switch(type){

            case "textarea" :
               return <textarea
                            name={name}
                            id={`${formName}_${name}`}
                            placeholder={placeholder}
                            onChange={ (e) => handleChange(e.target.value) }
                        /> 

            case "file" :
                return <input
                            type="file"
                            name={name}
                            id={`${formName}_${name}`}
                            onChange={ (e) => handleChange(e.target.files[0]) }
                        />


            default :
                return <Input
                            type={type}
                            name={name}
                            formName={formName}
                            placeholder={placeholder}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
        }

    }

    return(
        <div className="field">            
            <Label for={name}> { label }</Label>
            <div className="field__input">
                { renderInput() }
                <p className="field__error">{ errorMessage }</p>
            </div>
        </div>
    )
}


export default Field;