
import React, { useState } from "react";
import Input from "./Input.jsx";
import Label from "./Label.jsx";



const Field = ( { label, type, name, formName, placeholder="", returnValueToForm } ) => {

    const [ errorMessage, setErrorMessage ] = useState("");
    const [ fieldIsValid, setFieldIsValid ] = useState(false);

    const onFocus = ()=>{
        setErrorMessage("");
    }

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


    const handleChange = (file) => {

        setFieldIsValid(true);
        returnValueToForm(name, file, true)
        
    }


    const render = () => {

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
                { render() }
                <p className="field__error">{ errorMessage }</p>
            </div>
        </div>
    )
}


export default Field;