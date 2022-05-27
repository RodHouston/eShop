import { createSlice  } from "@reduxjs/toolkit";


const wishSlice = createSlice({
    name: "wish",
    initialState: {
        id:'',
        products: [],
        quantity: 0,
        total:0,
    },
    reducers:{
        syncWish:(state, action)=>{
            // console.log(action.payload.products);   
            state.id = action.payload._id;        
            state.quantity = action.payload.products.length;
            state.products = action.payload.products
            state.total = action.payload.amount;
        },
        addProduct:(state, action)=>{
            state.quantity +=1;
            state.products.push(action.payload)
            state.total += action.payload.price* action.payload.quantity;
            // console.log(action.payload.myCart);
        },
        clearWish:(state)=>{
            state.quantity =0;
            state.products = []
            state.total = 0
        }
    }
})

export const { addProduct, clearWish, syncWish } = wishSlice.actions;
export default wishSlice.reducer;