import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState:{
        isModalOpen: false,
        currentValue:{}
    },
    reducers: {
        onOpenModal: (state) => {
            state.isModalOpen=true;
        },
        onCloseModal: (state) => {
            state.isModalOpen=false;
        },
        onChangeValue: (state,{payload}) => {
            state.currentValue=payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { onOpenModal,onCloseModal,onChangeValue } = uiSlice.actions