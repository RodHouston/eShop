import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux"
import userReducer from "./userRedux"
import wishReducer from './wishRedux'
import menuReducer from "./sideMenuRedux";
import photoReducer from "./photoRedux";
import globalReducer from "./globalRedux"
import themeReducer from "./themeRedux";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const rootReducer = combineReducers(
    { 
      user: userReducer, 
      cart: cartReducer, 
      wish: wishReducer, 
      menu: menuReducer,
      photo: photoReducer,
      global: globalReducer,
      theme: themeReducer,
    });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,   
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },          
        })
 })
  
export let persistor = persistStore(store);