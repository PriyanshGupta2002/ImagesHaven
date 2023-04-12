export const INITIAL_STATE = {
    username:"",
    email:"",
    password:"",
    pp:"",
    desc:"",
    tags:[],
    address:"",
}

export const registerReducer=(state,action)=>{
    switch (action.type) {
        case "CHANGE_INPUT":
            return{
                ...state,
                [action.payload.name]:action.payload.value
            }
        
        case "USER_IMAGE":
            return{
                ...state,
                pp:action.payload.pp
            }
        

        case "ADD_TAGS":
            return {
                ...state,
                tags:[...state.tags,action.payload]
            }
        
    
        default:
            return state
    }
}