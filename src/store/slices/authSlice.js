import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        status: "not-authenticated",
        user:{},
        errorMessage:undefined
    },
    reducers: {
        onLogout: (state,{payload}) => {
            state.status="not-authenticated";
            state.user={};
            state.errorMessage=payload;
        },
        onLogin:(state,{payload})=>{
            state.status="authenticated";
            state.user=payload;
            state.errorMessage=undefined
        },
        onChecking:(state)=>{
            state.status="checking"
        },
        onfinished:(state)=>{
            if(!state.user.uid){
                state.status="not-authenticated"
            }else{
                state.status="authenticated";
            }
            
        }
    },
})

// Action creators are generated for each case reducer function
export const { onLogout,onLogin,onChecking,onfinished } = authSlice.actions