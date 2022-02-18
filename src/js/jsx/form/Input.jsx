
import React, { useState } from "react";
import formFields from "../../utils/formFields";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';



/**
 * a input element
 * @param {string} type le type de l'input (text | email | number ...)
 * @param {string} name input name
 * @returns 
 */
const Input = ( { type, name, onBlur, onFocus, formName, placeholder } ) => {
    
    const [ value, setValue ] = useState("");
    const [ typeInput, setTypeInput ] = useState(type);

    //  update the input value
    const handleChange = (event)=>{        
        setValue(event.target.value);
    }

    //  verify if the input value is valid
    const checkValue = ()=>{
        
        let regex = formFields[name].regex;
        let errorMessage = value === "" ? "" : formFields[name].errorMessage;
        let isValid = regex.test(value) ? true : false;
        
        onBlur(isValid, errorMessage, value);
        
    }



    const changeType = ()=>{

        if ( typeInput === "password" ) {
            setTypeInput("text")
        } else {
            setTypeInput("password")
        }
    }


    const getIconEye = ()=>{

        if ( typeInput === "password"){
            return <AiFillEye onClick={changeType}/>
        }  else {
            return <AiFillEyeInvisible onClick={changeType}/>
        }
    }

    return (
        <>
            <input 
                type={type != "password" ? type : typeInput}
                id={`${formName}_${name}`}
                name = {name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange }
                onBlur={checkValue}
                onFocus={onFocus}
            ></input>
            { type === "password" ? getIconEye() : null }

        </>
    )
}


export default Input;