import { createSlice  } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name: "global",
    initialState: {      
       categories: [],       
       galleries:[]
    },
    reducers:{       
        setCategories:(state, action)=>{
            state.categories=action.payload;
        },
        setGalleries:(state, action) => {
            state.galleries= action.payload
        },   
        
    }
})

export const { setCategories, setGalleries} = globalSlice.actions;
export default globalSlice.reducer;