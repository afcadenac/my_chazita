import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        users: [],
        //isLoadingUsers:true
    },
    reducers: {
        onLoadUsers: (state,{payload}) => {
            state.users = payload
            //state.isLoadingUsers=false
        },
        onUpdateUser:(state,{payload})=>{
            state.users=state.users.map((user)=>{
                if(payload._id===user._id){
                    return payload ;
                }else{
                    return user;
                }
            })
        },
        onDeleteUser:(state, {payload})=>{
            state.users=state.users.filter((user)=>user._id!==payload);
        }
    },
})

// Action creators are generated for each case reducer function
export const { onLoadUsers,onUpdateUser,onDeleteUser } = userSlice.actions