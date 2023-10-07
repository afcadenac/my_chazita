import { createSlice } from '@reduxjs/toolkit'

export const commentSlice = createSlice({
    name: 'comment',
    initialState:{
        isModalComment: false,
        comments:[]
    },
    reducers: {
        onOpenModalComment: (state) => {
            state.isModalComment= true
        },

        onCloseModalComment: (state) => {
            state.isModalComment= false
        },

        onLoadComment:(state,{payload})=>{
            state.comments=payload
        },

        onNewComment:(state,{payload})=>{
            state.comments.push(payload);
        },

        onDeleteComment:(state,{payload})=>{
            state.comments=state.comments.filter((comment)=>comment._id!==payload);
        },

        onUpdateComment:(state,{payload})=>{
            state.comments=state.comments.map((comment)=>{
                if(payload._id===comment._id){
                    return payload;
                }else{
                    return comment;
                }
                
            });
        }
    },
})

// Action creators are generated for each case reducer function
export const { onOpenModalComment,onDeleteComment,onLoadComment,onNewComment,onUpdateComment,onCloseModalComment } = commentSlice.actions