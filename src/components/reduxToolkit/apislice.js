import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const apifetch = createAsyncThunk("productdata", async (argument, { rejectWithValue }) => {
    const response = await axios.get('https://products-api-cwck.onrender.com/products')
    try {
        return response;
    }
    catch (error) {
        return rejectWithValue(error.message)
    }
})
export const productdetails = createSlice({
    name: 'alldata',
    initialState: {
        products: [],
        cart: [],
        quantity: 0,
        totalprice: 0,
        totalquantity: 0,
        loading: false,
        error: null
    },
    reducers: {
        addtocart: (state, action) => {
            let find = state.cart.findIndex(item => item.id === action.payload.id);
            console.log(find)
            if (find >= 0) {
                state.cart[find].quantity += 1;
            } else {
                state.cart.push(action.payload)
            }
        },

        removeItems: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },

        quantityItems: (state) => {
            let { quantity, totalprice } = state.cart.reduce(
                (current, initial) => {
                    console.log(current)
                    console.log(initial)
                    let { price, quantity } = initial;
                    console.log(price)
                    console.log(quantity)
                    const totalItems = price * quantity;
                    current.totalprice += totalItems;
                    current.quantity += quantity
                    return current;
                },
                {
                    quantity: 0,
                    totalprice: 0
                }
            );
            state.totalprice = parseInt(totalprice.toFixed(2))
            state.totalquantity = quantity;
        },

        increment: (state,action) => {
             state.cart = state.cart.map((item)=>{
                if(item.id === action.payload){
                    return {...item , quantity:item.quantity+1 }
                }
                return item
             })
        },

        decrement: (state,action) => {
            state.cart = state.cart.map((item)=>{
                if(item.id === action.payload){
                    return {...item , quantity:item.quantity-1 }
                }
                return item
             })
        }
    },


    extraReducers: {
        [apifetch.pending]: (state) => {
            state.loading = true;
        },
        [apifetch.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;

        },
        [apifetch.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        }
    }
})

export const { addtocart, removeItems, quantityItems,increment,decrement } = productdetails.actions;
export default productdetails.reducer;

