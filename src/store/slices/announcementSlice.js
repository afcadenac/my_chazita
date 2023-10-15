import { createSlice } from '@reduxjs/toolkit'

export const announcementSlice = createSlice({
    name: 'announcement',
    initialState:{
        announcements: [],
        currentAnnouncement:{},
        isModalAnnouncement: false,
    },
    reducers: {
        onNewAnnouncement: (state,{payload}) => {
            state.announcements.push(payload);
        },
        onDeleteAnnouncement:(state,{payload})=>{
            state.announcements=state.announcements.filter((announcement)=>announcement._id!==payload._id);
        },
        onLoadAnnouncements:(state,{payload})=>{
            state.announcements=payload;
        },
        onUpdateAnnouncement:(state,{payload})=>{
            state.announcements=state.announcements.map((announcement)=>{
                if(payload._id===announcement._id){
                    return payload;
                }else{
                    return announcement;
                }
                
            });
        },
        onChangeCurrentAnnouncement:(state,{payload})=>{
            state.currentAnnouncement=payload;
        },

        onOpenModalAnnouncement: (state) => {
            state.isModalAnnouncement= true
        },
        onCloseModalAnnouncement: (state) => {
            state.isModalAnnouncement= false
        },
    },
})

// Action creators are generated for each case reducer function
export const { onDeleteAnnouncement,onLoadAnnouncements,onNewAnnouncement,onUpdateAnnouncement,onChangeCurrentAnnouncement,onCloseModalAnnouncement,onOpenModalAnnouncement } = announcementSlice.actions