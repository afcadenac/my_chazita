import { createSlice } from '@reduxjs/toolkit'

export const chazaSlice = createSlice({
    name: 'chaza',
    initialState:{
        chazas: [],
        currentChaza:{},
        currentPhones:[],
        isModalPhones: false,
        currentNetworks:[],
        isModalNetwork: false,
        currentOwner:{},
        isModalLocation: false,
        currentPunctuation: {value:0},
        isModalPunctuation: false,
        
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


        onLoadCurrentPhones:(state,{payload})=>{
            state.currentPhones=payload;
        },
        onDeletePhone:(state,{payload})=>{
            state.currentPhones=state.currentPhones.filter((phone)=>phone._id!==payload);
        },
        onNewPhone:(state,{payload})=>{
            state.currentPhones.push(payload);
        },


        onLoadCurrentNetwork:(state,{payload})=>{
            state.currentNetworks=payload;
        },
        onDeleteNetwork:(state,{payload})=>{
            state.currentNetworks=state.currentNetworks.filter((network)=>network._id!==payload);
        },
        onNewNetwork:(state,{payload})=>{
            state.currentNetworks.push(payload);
        },


        onLoadChazas:(state,{payload})=>{
            state.chazas=payload;
        },
        onUpdateChaza:(state,{payload})=>{
            if(state.chazas){
                state.chazas=state.chazas.map((chaza)=>{
                    if(payload._id===chaza._id){
                        return payload;
                    }else{
                        return chaza;
                    }
                    
                });
            }
            
        },


        onChangeCurrentOwner:(state,{payload})=>{
            state.currentOwner=payload;
        },

        onChangeCurrentPunctuation:(state,{payload})=>{
            state.currentPunctuation=payload;
        },


        onOpenModalPhone: (state) => {
            state.isModalPhones= true
        },
        onCloseModalPhone: (state) => {
            state.isModalPhones= false
        },

        onOpenModalNetwork: (state) => {
            state.isModalNetwork= true
        },
        onCloseModalNetwork: (state) => {
            state.isModalNetwork= false
        },

        onOpenModalLocation: (state) => {
            state.isModalLocation= true
        },
        onCloseModalLocation: (state) => {
            state.isModalLocation= false
        },

        onOpenModalPunctuation: (state) => {
            state.isModalPunctuation= true
        },
        onCloseModalPunctuation: (state) => {
            state.isModalPunctuation= false
        },
    },
})

// Action creators are generated for each case reducer function
export const { onDeleteChaza,onNewChaza,onChangeCurrentChaza,onLoadChazas,onUpdateChaza,onLoadCurrentPhones,onCloseModalPhone,onOpenModalPhone,onDeletePhone,onNewPhone,onCloseModalNetwork,onDeleteNetwork,onLoadCurrentNetwork,onNewNetwork,onOpenModalNetwork,onChangeCurrentOwner,onCloseModalLocation,onOpenModalLocation,onCloseModalPunctuation,onOpenModalPunctuation,onChangeCurrentPunctuation } = chazaSlice.actions