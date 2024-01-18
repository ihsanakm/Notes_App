import axios from "axios"

// export const CHECK_USER = 'CHECK_USER'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT= 'USER_LOGGED_OUT'




// export const checkUser = ()=>{
//     return{
//         type:CHECK_USER
//     }
// }

export const userLoggedIn = ()=>{
    return{
        type:USER_LOGGED_IN
    }
}

export const userLoggedOut = ()=>{
    return{
        type:USER_LOGGED_OUT
    }
}

export const userCheck = () => {
    return async (dispatch) => {
        try {
            await axios.get("/check-auth", { withCredentials: true });
            dispatch(userLoggedIn());
          } catch (err) {
            console.log("error")
            dispatch(userLoggedOut());
          }
        }
}
