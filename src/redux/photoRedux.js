import { createSlice  } from "@reduxjs/toolkit";

const photoSlice = createSlice({
    name: "photo",
    initialState: {
       currentPhoto: null,
       photoThumbNails: [],
       dotIndex:0,
       isFetching: false,
       error: false, 
       galleries:[]
    },
    reducers:{
        setMainPhoto:(state, action)=>{
            state.currentPhoto= action.payload;
        },
        setThumbnails:(state, action)=>{
            state.photoThumbNails=action.payload;
        },
        setGalleries:(state, action) => {
            state.galleries= action.payload
        },   
        setDotIndex:(state, action) => {
            state.dotIndex= action.payload
        }
    }
})

export const { setMainPhoto, setThumbnails, setGalleries, setDotIndex} = photoSlice.actions;
export default photoSlice.reducer;