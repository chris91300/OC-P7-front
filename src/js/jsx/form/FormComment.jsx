

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfilImage from "../components/ProfilImage.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import Field from "./Field.jsx";
import Loading from '../components/Loading.jsx';
import requestApi from "../../utils/requestApi.js";


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

    const user = useSelector( ( state ) => state.user);
    const [ isLoading, setIsLoading ] = useState(false);
    const urlProfil = user.urlProfil;
    const pseudo = user.pseudo;
    const token = user.token;
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

        if ( !isLoading ) {

        
            if ( fields.comment.value != "" ) {

                setErrorMessage("");
                setIsLoading(true)

                let body = {
                    userId : userId,
                    text : fields.comment.value
                };

                body = JSON.stringify(body)               
               

                try{

                    let newComment = await requestApi({
                        entity : 'comments',
                        request : 'create',
                        body : body,
                        token : token,
                        mediaId : mediaId
                    })
                    
                    newComment.user = {
                        urlProfil : urlProfil,
                        pseudo : pseudo
                    }
                    newComment.reported = false;

                    
                    setIsLoading(false);
                    
                    dispatch({
                        type : "ADD_COMMENT",
                        value : {
                            mediaId : mediaId,
                            comment : newComment}

                        }) 
                    resetForm();
                

                } catch (err){

                    setIsLoading(false)
                    setErrorMessage(err.message)                
                    console.log(err.message)
                }
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
            {isLoading ? <Loading /> : null }
            <p className="form__error">{ errorMessage }</p>
        </form>
    )
}



export default FormComment;