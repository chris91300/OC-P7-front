
/**
 * function who use the js function fetch in order to simplify the system async / await
 * @param {string} url 
 * @returns an object the object that the server returns
 */
async function useFetch(url, options=null){

    let json;
    let response = await fetch(url, options);    
    json = await response.json();
    
    if ( !response.ok ){

        throw new Error(json.message);

    } else {

        return json;

    }

    

    
    
    
    
}

export default useFetch;








