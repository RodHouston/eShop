import { createSlice  } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mainColor:'black',
        mainSecondaryColor:'whitesmoke',
        mainAccentColor:'blue',
        lightMainColor:'teal',
        lightSecondaryColor:'whitesmoke',
        lightAccentColor:'coral',
        darkMainColor:'#17202A',
        darkSecondaryColor:'#D7DBDD',
        darkAccentColor:'rgb(211, 84, 0)',
        isDarkTheme:false        
    },
    reducers:{
        setIsDarkTheme:(state, action)=>{                        
            state.isDarkTheme = action.payload            
        },
        setMainColor:(state, action)=>{             
            state.mainColor = action.payload         
        },
        setMainSecondaryColor:(state, action)=>{                        
            state.mainSecondaryColor = action.payload    
        },
        setMainAccentColor:(state, action)=>{             
            state.mainAccentColor = action.payload         
        },
        setLightMainColor:(state, action)=>{                        
            state.lightMainColor = action.payload    
        },
        setLighSecondaryColor:(state, action)=>{                        
            state.lightSecondaryColor = action.payload    
        },
        setLighAccentColor:(state, action)=>{                        
            state.lightAccentColor = action.payload    
        },
        setDarkMainColor:(state, action)=>{                        
            state.darkMainColor = action.payload    
        },
        setDarkSecondaryColor:(state, action)=>{                        
            state.darkSecondaryColor = action.payload    
        },
        setDarkAccentColor:(state, action)=>{                        
            state.darkAccentColor = action.payload    
        }
    }
})

export const { setIsDarkTheme, setMainColor, setMainSecondaryColor, setMainAccentColor,
                setLightMainColor, setLighSecondaryColor, setLighAccentColor,
                setDarkMainColor, setDarkSecondaryColor, setDarkAccentColor,
     } = themeSlice.actions;
export default themeSlice.reducer;