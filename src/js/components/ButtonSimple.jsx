
import React from "react";


/**
 * Component ButtonSimple it's a button without button appearance
 * @param {function} onclick : the callback for the onClick event
 */
const ButtonSimple = ( { onClick, children } ) => {
    

    return(
        <button className="btn__no-style" onClick={()=>onClick(children)}>{children}</button>
    )
}


export default ButtonSimple;