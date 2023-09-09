import { createSlice } from '@reduxjs/toolkit'

export const chazaSlice = createSlice({
    name: 'chaza',
    initialState:{
        chazas: null,
        currentChaza:{}
    },
    reducers: {
        onNewChaza: (state,{payload}) => {
            state.chazas.push(payload);
        },
        onDeleteChaza:(state,{payload})=>{
            state.chazas=state.chazas.filter((chaza)=>chaza._id!==payload);
        },
        onChangeCurrentChaza:(state,{payload})=>{
            state.currentChaza=payload;
        },
        onLoadChazas:(state,{payload})=>{
            state.chazas=payload;
        },
        onUpdateChaza:(state,{payload})=>{
            state.chazas=state.chazas.map((chaza)=>{
                if(payload._id===chaza._id){
                    return payload;
                }else{
                    return chaza;
                }
                
            });
        }
    },
})

// Action creators are generated for each case reducer function
export const { onDeleteChaza,onNewChaza,onChangeCurrentChaza,onLoadChazas,onUpdateChaza } = chazaSlice.actions