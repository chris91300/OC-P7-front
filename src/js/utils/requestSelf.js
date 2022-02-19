
import useFetch from "./fetch";



/**
 * manage request to my self server 
 * @param {string} entity the object concerned by the request
 * @param {string} request the request ( what we want to do )
 * @param {object} body the content body of the request
 * @returns the self server answer 
 */
const useRequestSelf = async ( { entity, request, body } ) => {
   

    const book = {

        base : '/session',

        session : {

            get : {
                base: '',
                method : 'GET'
            },
    
            set : {
                base: '/set',
                method : 'POST'
            },
    
            delete : {
                base: '/delete',
                method : 'DELETE'
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

        if ( body != undefined ) {
            options.body = body;
            options.headers['Content-Type'] = 'application/json';
        };

        

        return options

       
    }


    /**
     * construct the url for the fetch function
     * @returns url for fetch
     */
    const getUrl = ()=>{
        
        let url = book.base + book[entity][request].base;
        return url;

    }

    /**
     * use fetch to request to the self server
     * @returns the answer of the self server
     */
    const getFetch =async ()=>{
        let url = getUrl();
        let options = getOptions()

        return await useFetch( url, options );

    }

   

    return await getFetch()

}


export default useRequestSelf;