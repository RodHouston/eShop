import { publicRequest } from "../RequestMethods"

import { loginFailure, loginStart, loginSuccess, logOut } from "./userRedux"

export const login = async (dispatch, user)=>{
    dispatch(loginStart())
    try {        
        console.log(user);
        const cUser = await publicRequest.post("/auth/login", user)      
        console.log(cUser.data);
        dispatch(loginSuccess(cUser.data));        
        
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const logout = async (dispatch, user)=>{    
    
    try {
        // console.log('we here');
        // const res = await publicRequest.post("/auth/logout")
        dispatch(logOut());
    } catch (error) {
        
    }
}