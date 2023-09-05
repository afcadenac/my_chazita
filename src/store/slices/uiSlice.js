import { createSlice, current } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState:{
        isModalOpen: false,
        isModalPhotoOpen: false,
        currentTypePhoto:"",

        currentValue:{},
        currentValueSelector:{}
    },
    reducers: {
        onOpenModalPhoto: (state) => {
            state.isModalPhotoOpen=true;
        },
        onCloseModalPhoto: (state) => {
            state.isModalPhotoOpen=false;
        },

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
        },
        onChangeTypePhoto: (state,{payload}) => {
            state.currentTypePhoto=payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { onOpenModal,onCloseModal,onChangeValue,onChangeValueSelector,onCloseModalPhoto,onOpenModalPhoto,onChangeTypePhoto } = uiSlice.actions