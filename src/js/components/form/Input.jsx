
import React, { useState } from "react";
import formFields from "../../utils/formFields";



/**
 * 
 * @param {string} type le type de l'input (text | email | number ...)
 * @param {string} name input name
 * @returns 
 */
const Input = ( { type, name, onBlur, onFocus, formName } ) => {
    
    const [ value, setValue ] = useState("");

    //  met à jour la valeur de l'input
    const handleChange = (event)=>{        
        setValue(event.target.value);
    }

    //  vérifie la conformité de la valeur
    const checkValue = ()=>{
        
        let regex = formFields[name].regex;
        let errorMessage = value === "" ? "" : formFields[name].errorMessage;
        let isValid = regex.test(value) ? true : false;
        
        onBlur(isValid, errorMessage, value);
        
    }

    return <input 
                type={type}
                id={`${formName}_${name}`}
                name = {name}
                value={value}
                onChange={handleChange }
                onBlur={checkValue}
                onFocus={onFocus}
            ></input>
}


export default Input;