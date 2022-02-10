
import React from "react";


const Button = ( { className , onClick, children } ) => {

    return(
        <button className={className} onClick={()=>onClick(children)}>{children}</button>
    )
}


export default Button;