import { createSlice } from '@reduxjs/toolkit'

export const chazaSlice = createSlice({
    name: 'chaza',
    initialState:{
        chazas: [
            // {
            //     _id:1,
            //     name:"districhaza",
            //     punctuation:4.5,
            //     date:"08/08/2019",
            //     location:"donde los mariguanos"
            // },
            // {
            //     _id:2,
            //     name:"districhaza2",
            //     punctuation:4.5,
            //     date:"07/09/2019",
            //     location:"en la biblioteca"
            // },
            // {
            //     _id:3,
            //     name:"districhaza3",
            //     punctuation:4.5,
            //     date:"01/08/2021",
            //     location:"bloque 14 :v"
            // }
        ],
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