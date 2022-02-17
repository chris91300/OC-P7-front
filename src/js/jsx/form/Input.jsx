
import React, { useState } from "react";
import formFields from "../../utils/formFields";



/**
 * a input element
 * @param {string} type le type de l'input (text | email | number ...)
 * @param {string} name input name
 * @returns 
 */
const Input = ( { type, name, onBlur, onFocus, formName, placeholder } ) => {
    
    const [ value, setValue ] = useState("");

    //  update the input value
    const handleChange = (event)=>{        
        setValue(event.target.value);
    }

    //  verify if the input value is valid
    const checkValue = ()=>{
        console.log("check value name =>"+name)
        console.log(formFields[name])
        let regex = formFields[name].regex;
        let errorMessage = value === "" ? "" : formFields[name].errorMessage;
        let isValid = regex.test(value) ? true : false;
        
        onBlur(isValid, errorMessage, value);
        
    }

    return <input 
                type={type}
                id={`${formName}_${name}`}
                name = {name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange }
                onBlur={checkValue}
                onFocus={onFocus}
            ></input>
}


export default Input;