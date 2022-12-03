import { createSlice  } from "@reduxjs/toolkit";

const photoSlice = createSlice({
    name: "photo",
    initialState: {
       currentPhoto: null,
       photoThumbNails: [],
       isFetching: false,
       error: false
    },
    reducers:{
        setMainPhoto:(state, action)=>{
            state.currentPhoto= action.payload;
        },
        setThumbnails:(state, action)=>{
            state.photoThumbNails=action.payload;
        }      
    }
})

export const { setMainPhoto, setThumbnails} = photoSlice.actions;
export default photoSlice.reducer;