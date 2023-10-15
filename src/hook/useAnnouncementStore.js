import { useDispatch, useSelector } from "react-redux"
import chazaApi from "../api/ChazaApi";
import { useAuthStore } from "./useAuthStore";
import { onChangeCurrentAnnouncement, onCloseModalAnnouncement, onDeleteAnnouncement, onLoadAnnouncements, onNewAnnouncement, onOpenModalAnnouncement, onUpdateAnnouncement } from "../store";
import { getFilteredAnnouncements } from "../helpers";
import { useUiStore } from "./useUiStore";


export const useAnnouncementStore = () => {
    const {announcements,currentAnnouncement,isModalAnnouncement}=useSelector((state)=>state.announcement);
    const dispatch=useDispatch();
    const {user,status}=useAuthStore();
    const {ChangeIsLoading}=useUiStore();

    const startNewAnnouncement=async(announcement,photo)=>{
        try {
            const formData=new FormData();
            formData.append("photo",photo)
            console.log(formData)
            await chazaApi.post("/image/delete",{path:announcement.photo});
            const {data}=await chazaApi.post("/image/",formData);

            console.log(data)

            const {data:data2}=await chazaApi.post("/announcement",{...announcement,photo:data.url,date:new Date(),user:user.uid});
            dispatch(onNewAnnouncement({_id:data2._id,photo:data2.photo,date:data2.date,lat:data2.lat,lon:data2.lon,title:data2.title,price:data2.price,type:data2.type,user:data2.user,description:data2.description}));
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdateAnnouncement=async(announcement,photo)=>{
        try {
            const formData=new FormData();
            formData.append("photo",photo)

            await chazaApi.post("/image/delete",{path:announcement.photo});
            const {data}=await chazaApi.post("/image/",formData);

            const {data:data2}=await chazaApi.put(`/announcement/${announcement._id}`,{...announcement,photo:data.url});
            dispatch(onUpdateAnnouncement(data2.announcementUpdated));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadAnnouncement=async()=>{
        try {
            ChangeIsLoading(true);

            const {data}=await chazaApi.get("/announcement");
            dispatch(onLoadAnnouncements(data.announcement));

            ChangeIsLoading(false);
        } catch (error) {
            console.log(error);
            ChangeIsLoading(false);
        }
    }

    const startFilterAnnouncement=async(filter)=>{
        try {
            const {data}=await chazaApi.get("/announcement");
            let announcementsFilter=data.announcement;

            announcementsFilter=getFilteredAnnouncements(filter,announcementsFilter);

            if(filter.myAnnouncements==="Mis anuncios" && status==="authenticated"){
                announcementsFilter=announcementsFilter.filter((announcements)=>announcements.user===user.uid);
            }
            
            dispatch(onLoadAnnouncements(announcementsFilter));
        } catch (error) {
            console.log(error);
        }
    }

    const startDeleteAnnouncement=async(announcement)=>{
        try {
            const {data}=await chazaApi.delete(`/announcement/${announcement._id}`);

            await chazaApi.post("/image/delete",{path:data.announcementDeleted.photo});

            dispatch(onDeleteAnnouncement(announcement));
        } catch (error) {
            console.log(error);
        }
    }

    const startCloseAnnouncement=()=>{
        dispatch(onCloseModalAnnouncement());
        //dispatch(onChangeCurrentAnnouncement({}));
    }

    const startOpenAnnouncement=()=>{
        dispatch(onOpenModalAnnouncement());
    }

    const startChangeCurrentAnnouncement=(announcement)=>{
        dispatch(onChangeCurrentAnnouncement(announcement));
    }

    return {
        announcements,
        currentAnnouncement,
        isModalAnnouncement,

        startLoadAnnouncement,
        startNewAnnouncement,
        startCloseAnnouncement,
        startOpenAnnouncement,
        startChangeCurrentAnnouncement,
        startFilterAnnouncement,
        startDeleteAnnouncement,
        startUpdateAnnouncement
    }
}
