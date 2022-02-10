
import React from "react";


/**
 * a label element
 * @param {string} name the input name
 * @returns 
 */
const Label = ( { name, children } ) => {


    return <label htmlFor={name}>{ children }</label>
}

export default Label;