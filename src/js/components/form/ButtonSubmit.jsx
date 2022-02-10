
import React from "react";


/**
 * Component ButtonSubmit represente the element HTML input type='submit'
 * @param {function} onClick the callback use when user click on the button submit 
 * @param {string} value the value of the attribute value. defautl value = 'envoyer'
 * @returns 
 */
const ButtonSubmit = ( { onClick, value="envoyer" } ) => {


    return <input type="submit" value={value} onClick={onClick}></input>
}


export default ButtonSubmit;