import {configureStore} from '@reduxjs/toolkit'
import { authSlice, chazaSlice, productSlice, uiSlice, userSlice,commentSlice, announcementSlice} from './';

export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        ui:uiSlice.reducer,
        user:userSlice.reducer,
        chaza:chazaSlice.reducer,
        product:productSlice.reducer,
        comment: commentSlice.reducer,
        announcement:announcementSlice.reducer
    }
});