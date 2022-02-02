


const initialState = {
    user : {
        id : "",
        lastName : "",
        firstName : "",
        pseudo : "",
        createdAt : "",
        password : "",
        token : "",
        admin : false,
    },
    medias : []
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
                nextMedias.push(action.value)
                
                return {...state, medias : nextMedias}
            }
            else {return state}
            


        default:
            return state;
    }

}

export default Reducer;

