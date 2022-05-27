import { createSlice  } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
       currentUser: null,
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
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error = true;
        },
        logOut:(state) => {
            state.currentUser = null
            // console.log('here logout');
        }        
    }
})

export const { loginStart, loginSuccess, loginFailure, logOut, loginReset } = userSlice.actions;
export default userSlice.reducer;