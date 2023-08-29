import {configureStore} from '@reduxjs/toolkit'
import { authSlice, uiSlice, userSlice } from './';

export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        ui:uiSlice.reducer,
        user:userSlice.reducer
    }
});