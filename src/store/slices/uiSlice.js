import { createSlice, current } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState:{
        isModalOpen: false,
        currentValue:{},
        currentValueSelector:{}
    },
    reducers: {
        onOpenModal: (state) => {
            state.isModalOpen=true;
        },
        onCloseModal: (state) => {
            state.isModalOpen=false;
            state.currentValue={};
        },
        onChangeValue: (state,{payload}) => {
            state.currentValue=payload;
        },
        onChangeValueSelector: (state,{payload}) => {
            state.currentValueSelector=payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { onOpenModal,onCloseModal,onChangeValue,onChangeValueSelector } = uiSlice.actions