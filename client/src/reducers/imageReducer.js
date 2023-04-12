export const INITIAL_STATE = {
    title:"",
    desc:"",
    tags:[],
    cat:"",
    image:""
}

export const imageReducer=(state,action)=>{
    switch (action.type) {
        case "CHANGE_INPUT":
            return{
                ...state,
                [action.payload.name]:action.payload.value
            }
        
        case "IMAGE":
            return{
                ...state,
                image:action.payload.image
            }
        

        case "ADD_TAGS":
            return {
                ...state,
                tags:[...state.tags,action.payload]
            }
        case "REMOVE_TAGS":
            return {
                ...state,
                tags:state.tags.filter((tag)=>tag!=action.payload)
            }
        
    
        default:
            return state
    }
}