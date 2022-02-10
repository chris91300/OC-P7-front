


const initialState = {
    user : {
        id : "",
        lastName : "",
        firstName : "",
        pseudo : "",
        createdAt : "",
        password : "",
        urlProfil : "",
        token : "",
        admin : false,
    },
    medias : [],
    comments : {},
    admin : {
        medias : [],
        comments : []
    }
}


function Reducer(state = initialState, action){

    let nextState;

    switch(action.type){

        case "SET_USER":

            if( typeof action.value === "object")
            {
                return {...state, user : action.value}
            }
            else { return state}
           



        case "SET_MEDIAS":
            if( typeof action.value === "object")
            {
                return { ...state, medias : action.value}
            }
            else {return state}

        
        case "ADD_MEDIA":
            if( typeof action.value === "object")
            {
                let nextMedias = [...state.medias];
                nextMedias.unshift(action.value)
                
                return {...state, medias : nextMedias}
            }
            else {return state}
            

        case "SET_COMMENTS":
            if( typeof action.value === "object")
            {
                let mediaId = action.value.mediaId;
                let comments = action.value.comments
                let nextComments = {...state.comments};
                nextComments[mediaId] = comments;
                
                return {...state, comments : nextComments}
            }
            else {return state}

        case "ADD_COMMENT":
            
            if( typeof action.value === "object")
            {
                let mediaId = action.value.mediaId;
                let comment = action.value.comment
                let nextComments = {...state.comments};
                nextComments[mediaId].push(comment);
                
                return {...state, comments : nextComments}
            }
            else {return state}
            


        default:
            return state;
    }

}

export default Reducer;

