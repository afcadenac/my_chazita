import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState:{
        products: [],
        currentProduct:{}
    },
    reducers: {
        onNewProduct: (state,{payload}) => {
            state.products.push(payload);
        },
        onDeleteProduct:(state,{payload})=>{
            state.products=state.products.filter((product)=>product._id!==payload._id);
        },
        onChangeCurrentProduct:(state,{payload})=>{
            state.currentProduct=payload;
        },
        onLoadProducts:(state,{payload})=>{
            state.products=payload;
        },
        onUpdateProduct:(state,{payload})=>{
            state.products=state.products.map((product)=>{
                if(payload._id===product._id){
                    return payload;
                }else{
                    return product;
                }
                
            });
        }
    },
})

// Action creators are generated for each case reducer function
export const { onChangeCurrentProduct,onDeleteProduct,onLoadProducts,onNewProduct,onUpdateProduct } = productSlice.actions