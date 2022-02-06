

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilImage from "../ProfilImage.jsx";
import Field from "./Field.jsx";


const defautlFields = {
    comment : {
        value : "",
        isValid : false
    }
}

const FormComment = ( { name } )=>{

    const urlProfil = useSelector( ( state ) => state.user.urlProfil);
    const [ fields, setFields] = useState({...defautlFields})
    const [ errorMessage, setErrorMessage ] = useState("");
    const dispatch = useDispatch();


    const changeFields = (name, value, isValid) => {
        
        let newFields = {...fields};
        fields[name].value = value;
        fields[name].isValid = isValid;
        setFields(newFields);
    }

    return(
        <form action="#" method="post" id={"form_"+name}>
            <ProfilImage url={urlProfil} />
            <Field
                label=""
                type="textarea"
                name="comment"
                placeholder="laisser un commentaire"
                formName={name}
                returnValueToForm={changeFields} />
        </form>
    )
}



export default FormComment;