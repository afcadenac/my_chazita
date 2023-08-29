import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        users: [''],
    },
    reducers: {
        onLoadUsers: (state,{payload}) => {
            state.users = payload
        },
        onUpdateUser:(state,{payload})=>{
            state.users=state.users.map((user)=>{
                if(payload._id===user._id){
                    return payload ;
                }else{
                    return user;
                }
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const { onLoadUsers,onUpdateUser } = userSlice.actions