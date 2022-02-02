
import React from "react";


const ButtonSimple = ( { onClick, children } ) => {
    

    return(
        <button className="btn__no-style" onClick={()=>onClick(children)}>{children}</button>
    )
}


export default ButtonSimple;