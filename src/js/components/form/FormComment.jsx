

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../utils/fetch.js";
import ProfilImage from "../ProfilImage.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import Field from "./Field.jsx";


const defautlFields = {
    comment : {
        value : "",
        isValid : false
    }
}

const FormComment = ( { name, mediaId, userId, returnNewComment } )=>{

    const urlApiCreateComment = "http://localhost:3000/api/comments/"+mediaId;
    const urlProfil = useSelector( ( state ) => state.user.urlProfil);
    const pseudo = useSelector( ( state ) => state.user.pseudo);
    const [ fields, setFields] = useState({...defautlFields})
    const [ errorMessage, setErrorMessage ] = useState("");
    const dispatch = useDispatch();


    const changeFields = (name, value, isValid) => {
        
        let newFields = {...fields};
        fields[name].value = value;
        fields[name].isValid = isValid;
        setFields(newFields);
    }




    const submit = async (e)=>{
        e.preventDefault();

        let body = {
            userId : userId,
            text : fields.comment.value
        }
        
        let options = {
            method : 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        }

        try{
            let newComment = await useFetch(urlApiCreateComment, options)
            console.log("voici le nouveau commentaire")
            console.log(newComment)
            //returnNewComment(newComment)
            newComment.user = {
                urlProfil : urlProfil,
                pseudo : pseudo
            }
            newComment.reported = false;
            
            dispatch({
                type : "ADD_COMMENT",
                value : {
                    mediaId : mediaId,
                    comment : newComment}

                })
           

        } catch (err){
            setErrorMessage(err.message)
            console.log(err.message)
        }
    }

    return(
        <form action="#" method="post" id={"form_"+name} className="form_comment">
            <div>
                <ProfilImage url={urlProfil} />
                <Field
                    label=""
                    type="textarea"
                    name="comment"
                    placeholder="laisser un commentaire"
                    formName={name}
                    returnValueToForm={changeFields} />
            </div>
            <ButtonSubmit onClick={submit} />
            <p className="form__error">{ errorMessage }</p>
        </form>
    )
}



export default FormComment;