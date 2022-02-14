


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
    medias_reported : {},
    comments_reported : {}
    
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
           


        case "SET_USER_PICTURE":
            console.log("set user picture")
            if( typeof action.value === "string")
            {console.log("c un string")
            console.log(action.value)
                let newUser = {...state.user};

                newUser.urlProfil = action.value;
                console.log(newUser)
                return {...state, user : newUser}
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



        case "DELETE_MEDIA":            

            if( !isNaN(action.value))
            {
                let nextMedias = [...state.medias];
                nextMedias.forEach( (media, index ) => {
                    if ( media.id == action.value ) {
                        nextMedias.splice(index, 1);
                    }
                });
                
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



        case "ADD_MEDIAS_REPORTED":
            if( typeof action.value === "object")
            {
                let mediasReported = {...state.medias_reported};
                action.value.map( ( media ) =>{
                    mediasReported[media.id] = media;
                })
                
                return {...state, medias_reported : mediasReported}
            }
            else {return state}


        case "REMOVE_MEDIA_REPORTED":

            let mediasReported = {...state.medias_reported};
            if( mediasReported[action.value] != undefined) {

                delete mediasReported[action.value];
                return {...state, medias_reported : mediasReported}

            } else {

                return state;
            }



        case "ADD_COMMENTS_REPORTED":
            if( typeof action.value === "object")
            {
                let commentsReported = {...state.comments_reported};
                action.value.map( ( comment ) =>{
                    commentsReported[comment.id] = comment;
                })
                console.log("dans add comments reported")
                console.log(commentsReported)
                return {...state, comments_reported : commentsReported}
            }
            else {return state}


        case "REMOVE_COMMENT_REPORTED":

            let commentsReported = {...state.comments_reported};
            if( commentsReported[action.value] != undefined) {

                delete commentsReported[action.value];
                return {...state, comments_reported : commentsReported}

            } else {
                
                return state;
            }
            


        default:
            return state;
    }

}

export default Reducer;

