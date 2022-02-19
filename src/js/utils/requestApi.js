
import useFetch from "./fetch";



/**
 * manage request to API 
 * @param {string} entity the object concerned by the request
 * @param {string} request the request ( what we want to do )
 * @param {string} userId user id
 * @param {string} mediaId media id
 * @param {string} commentId comment id
 * @param {string} token user token for authorization
 * @param {object} body the content body of the request
 * @param {boolean} contentType if request headers need a content-type
 * @returns the API answer 
 */
const requestApi = async ( { entity, request, userId, mediaId, commentId, token, body, contentType=true } ) => {

   const base = {

    users : '/api/users',

    medias : '/api/medias',

    comments : '/api/comments',

    admin : '/api/admin'

   }

    const book = {

        base : 'http://localhost:3000',

        users : {            

            signup : {
                base: '/signup',
                method : 'POST',
                token : false
            },
    
            login : {
                base: '/login',
                method : 'POST',
                token : false
            },

            updatePassword : {
                base: `/${userId}/update/password`,
                method : 'PUT',
                token : true
            },

            updatePicture : {
                base: `/${userId}/update/picture`,
                method : 'PUT',
                token : true
            },

            delete : {
                base: `/${userId}/delete`,
                method : 'DELETE',
                token : true
            },
            
        },

        medias : {

            getAll : {
                base: '/',
                method : 'GET',
                token : true
            },

            create : {
                base: '/create',
                method : 'POST',
                token : true
            },

            like : {
                base: `/${mediaId}/like`,
                method : 'POST',
                token : true
            },

            reported : {
                base: `/${mediaId}/reported`,
                method : 'POST',
                token : true
            },

        },

        comments : {

            getAll : {
                base: `/${mediaId}`,
                method : 'GET',
                token : true
            },

            create : {
                base: `/${mediaId}`,
                method : 'POST',
                token : true
            },

            reported : {
                base: `/${mediaId}/${commentId}/reported`,
                method : 'POST',
                token : true
            },

        },

        admin : {

            getMediasReported : {
                base: '/medias/reported',
                method : 'GET',
                token : true
            },

            deleteMedia : {
                base: `/medias/${mediaId}/delete`,
                method : 'DELETE',
                token : true
            },

            removeReportedMedia : {
                base: `/medias/${mediaId}/remove_reported`,
                method : 'GET',
                token : true
            },

            getCommentsReported : {
                base: '/comments/reported',
                method : 'GET',
                token : true
            },

            deleteComment : {
                base: `/comments/${commentId}/delete`,
                method : 'DELETE',
                token : true
            },

            removeReportedComment : {
                base: `/comments/${commentId}/remove_reported`,
                method : 'GET',
                token : true
            },

        }

        

        

    };
    


    /**
     * construct the options for the fetch function
     * @returns options for fetch
     */
    const getOptions = ()=> {

        let options = {
            method : book[entity][request].method,
            headers :  {
                'Accept': 'application/json'
            },
        }

        if ( contentType ) {
            options.headers['Content-Type'] = 'application/json';
        }

        if ( body != undefined ) {
            options.body = body;
        };

        //  'Authorization' : 'Bearer '+token
        if ( book[entity][request].token ) {
            options.headers.Authorization = 'Bearer '+token;
        }

        return options

       
    }


    /**
     * construct the url for the fetch function
     * @returns url for fetch
     */
    const getUrl = ()=>{
        
        let url = book.base + base[entity] + book[entity][request].base;
        return url;

    }

    /**
     * use fetch to request to the API
     * @returns the answer of the API
     */
    const getFetch =async ()=>{
        let url = getUrl();
        let options = getOptions()

        return await useFetch( url, options );

    }

   

    return await getFetch()

}


export default requestApi;