
import React, { useEffect, useState } from "react";
import Field from "./Field.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import { useDispatch } from "react-redux";
import useFetch from "../../utils/fetch.js";
import { useSelector } from "react-redux";


/**
 * default value of input form
 */
const defautlFields = {
    title : {
        value : "",
        isValid : false
    },
    text : {
        value : "",
        isValid : false
    },
    image : {
        value : "",
        isValid : false
    }
}


/**
 * Manage the possibility to create one media
 * @param {string} name the form name
 * @param {function} handleClick a callback. show or hide the form
 */
const FormCreateMedia = ( { name, handleClick } ) => {

    const createMediaUrl = "http://localhost:3000/api/medias/create";

    const [ fields, setFields] = useState({...defautlFields})
    const [ errorMessage, setErrorMessage ] = useState("");
    const medias = useSelector( ( state ) => state.medias);
    const user = useSelector( ( state ) => state.user);
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
    const submit = (e) => {
        e.preventDefault();
        if (
            fields.title.isValid &
            fields.text.isValid &
            fields.image.isValid 
            ) {
                createMedia();
            } else {
                setErrorMessage("formulaire non valide.")
                console.log("form non valide même après verif")
                
            }


    }



    /**
     * async function
     * send informations to the API
     * in order to create one media
     */
    const createMedia = async ()=>{
        
        let formData = new FormData();
        formData.append("title", fields.title.value)
        formData.append("text", fields.text.value)
        formData.append("image", fields.image.value)
        formData.append("userId", user.id)


        let options = {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer '+user.token
            },
            body : formData
        }

        try{
            
            let media = await useFetch(createMediaUrl, options)
            
            dispatch({type : 'ADD_MEDIA', value : media })
            reset();
            
        } catch (err){
            setErrorMessage(err.message)
            console.log(err.message)
        }
        
    }


    /**
     * after create media and if request is valid
     * reset fields and hide the form
     */
    const reset = ()=>{

        Object.entries(defautlFields).map(([key, data]) => {
            
            let element = document.getElementById(`${name}_${key}`);
            element.value = null;
        })
        setFields({...defautlFields});
        handleClick();
    }




    return (
        <form id="form_create_media" method="post" action="#" encType="multipart/form-data">
            <Field label="titre" type="text" name="title" formName={name} returnValueToForm={changeFields} />
            <Field label="description" type="textarea" name="text" formName={name} returnValueToForm={changeFields} />
            <Field label="media" type="file" name="image" formName={name} returnValueToForm={changeFields} />
            <ButtonSubmit onClick={submit} />
            <p className="error">{ errorMessage }</p>
        </form>
        
    )
}


export default FormCreateMedia;