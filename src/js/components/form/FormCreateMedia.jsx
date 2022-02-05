
import React, { useEffect, useState } from "react";
import Field from "./Field.jsx";
import ButtonSubmit from "./ButtonSubmit.jsx";
import { useDispatch } from "react-redux";
import useFetch from "../../utils/fetch.js";
import { useSelector } from "react-redux";


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

const FormCreateMedia = ( { name, handleClick } ) => {

    const createMediaUrl = "http://localhost:3000/api/medias/create";

    const [ fields, setFields] = useState({...defautlFields})
    const [ errorMessage, setErrorMessage ] = useState("");
    const medias = useSelector( ( state ) => state.medias);
    const user = useSelector( ( state ) => state.user);
    const dispatch = useDispatch();


    useEffect(()=>{
        console.log("medias dans reducer a cangé")
        console.log(medias)
    }, [medias])

    const changeFields = (name, value, isValid) => {
        
        let newFields = {...fields};
        fields[name].value = value;
        fields[name].isValid = isValid;
        setFields(newFields);
    }

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
            console.log("media créé et vaut ")
            console.log(media)
            dispatch({type : 'ADD_MEDIA', value : media })
            reset();
            
        } catch (err){
            setErrorMessage(err.message)
            console.log(err.message)
        }
        
    }


    const reset = ()=>{

        Object.entries(defautlFields).map(([key, data]) => {
            console.log("on reset et key => "+key)
            let element = document.getElementById(`${name}_${key}`);
            console.log(element)
            element.value = null;
            console.log(document.getElementById(`${name}_${key}`).value)
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
            <p className="form__error">{ errorMessage }</p>
        </form>
        
    )
}


export default FormCreateMedia;