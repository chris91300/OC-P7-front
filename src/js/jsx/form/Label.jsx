
import React from "react";


/**
 * a label element
 * @param {string} htmlFor the for attribut
 * @returns 
 */
const Label = ( { htmlFor, children } ) => {

    return <label htmlFor={htmlFor}>{ children }</label>
}

export default Label;