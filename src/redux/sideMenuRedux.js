import { createSlice  } from "@reduxjs/toolkit";


const menuSlice = createSlice({
    name: "menuOpen",
    initialState: {
        mainMenu:false,       
        category:false,       
        subCat:false, 
        currProduct:{},
        dropDownMenu:false      
    },
    reducers:{
        openMainMenu:(state)=>{
            // console.log(action.payload.products);   
            state.mainMenu = !state.mainMenu;     
        },
        openCats:(state)=>{
            state.category = !state.category;
       },
        openSubCat:(state)=>{
            state.subCat = !state.subCat;
        },
        closeMenu:(state)=>{
            state.mainMenu = false;  
            state.category = false;
            state.subCat = false;
        },
        setCurrProduct:(state, action) =>{
            console.log(action);
            state.currProduct= action.payload
        },
        clearCurrProduct:(state) =>{
            state.currProduct= {}
        },
        openDropDownMenu:(state)=>{
            // console.log(action.payload.products);   
            state.dropDownMenu = !state.dropDownMenu;     
        },
        closeDropDownMenu:(state, action)=>{
            // console.log(action.payload.products);   
            state.dropDownMenu = action.payload;     
        },
    }
})

export const { openCats, openMainMenu, openSubCat, closeMenu, setCurrProduct, clearCurrProduct, openDropDownMenu, closeDropDownMenu } = menuSlice.actions;
export default menuSlice.reducer;