
import React from "react";


const Button = ( { className , onClick, children } ) => {
    console.log("on est dans Button")
    console.log(children)

    return(
        <button className={className} onClick={()=>onClick(children)}>{children}</button>
    )
}


export default Button;