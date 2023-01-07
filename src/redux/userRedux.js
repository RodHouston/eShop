import { createSlice  } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
       currentUser: {
           _id: window.navigator.userAgent.replace(/\D+/g, '')
       },
       tempUser: true,
       isFetching: false,
       error: false
    }, 
    reducers:{
        loginReset:(state)=>{
            state.isFetching=false;
        },
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state, action)=>{
            state.isFetching=false;
            state.tempUser=false;
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error = true;
        },
        logOut:(state) => {
            state.tempUser = true;
            state.currentUser = {
                _id: window.navigator.userAgent.replace(/\D+/g, '')
            };
            // console.log('here logout');
        }        
    }
})

export const { loginStart, loginSuccess, loginFailure, logOut, loginReset } = userSlice.actions;
export default userSlice.reducer;