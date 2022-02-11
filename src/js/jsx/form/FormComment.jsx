

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../utils/fetch.js";
import ProfilImage from "../components/ProfilImage.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import Field from "./Field.jsx";


/**
 * default value of input form
 */
const defautlFields = {
    comment : {
        value : "",
        isValid : false
    }
}


/**
 * Component FormComment
 * Manage the creation fo one comment
 * @param {string} name the form name
 * @param {string} mediaId the media id 
 * @param {string} name the user id
 */
const FormComment = ( { name, mediaId, userId, returnNewComment } )=>{

    const urlApiCreateComment = "http://localhost:3000/api/comments/"+mediaId;
    const urlProfil = useSelector( ( state ) => state.user.urlProfil);
    const pseudo = useSelector( ( state ) => state.user.pseudo);
    const [ fields, setFields] = useState({...defautlFields})
    const [ errorMessage, setErrorMessage ] = useState("");
    const dispatch = useDispatch();


    /**
     * set informations about the input value
     * and change the state fields
     * @param {string} name input name
     * @param {*} value input value
     * @param {boolean} isValid if value is valid
     */
    const changeFields = (name, value, isValid) => {
        
        let newFields = {...fields};
        fields[name].value = value;
        fields[name].isValid = isValid;
        setFields(newFields);
    }



    /**
     * submit the form
     * @param {object} e the event object
     */
    const submit = async (e)=>{
        e.preventDefault();
        if ( fields.comment.value != "" ) {

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
                resetForm();
            

            } catch (err){
                setErrorMessage(err.message)
                console.log(err.message)
            }
        }

    }


    /**
     * reset fields of the form
     */
    const resetForm = ()=>{
        let field = document.getElementById(`comment_media_${mediaId}_comment`)
        field.value = null;
        setFields(defautlFields);
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