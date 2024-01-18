// import { CHECK_USER } from "./userAction"
import { USER_LOGGED_IN } from "./userAction"
import { USER_LOGGED_OUT } from "./userAction"

const initialState = {
    user:null
}

export const reducer = (state=initialState,action)=>{
    switch(action.type){
        case USER_LOGGED_IN:return{
            user:true
        }
        case USER_LOGGED_OUT:return{
            user:false
        }
        
        default: return state
    }

}

