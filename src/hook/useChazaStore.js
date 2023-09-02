import { useDispatch, useSelector } from "react-redux"
import { onChangeCurrentChaza, onDeleteChaza, onLoadChazas, onNewChaza } from "../store";
import chazaApi from "../api/ChazaApi";
import { useUserStore } from "./useUserStore";
import { getFilteredChazas } from "../helpers";


export const useChazaStore = () => {

    const {chazas,currentChaza}=useSelector((state)=>state.chaza);
    const dispatch=useDispatch();

    const {startUpdateUser,users}=useUserStore();

    const startDeleteChaza=async(id)=>{
        try {
            const {data}=await chazaApi.delete(`/chaza/${id}`);

            console.log(data.chazaDeleted._id);
            
            users.forEach(user => {
                if(user.chaza===id){
                    startUpdateUser({...user,chaza:null});
                }
            });

            dispatch(onDeleteChaza(id));
        } catch (error) {
            console.log(error);
        }
    }

    const startNewChaza=async(user,name)=>{
        try {
            const {data}=await chazaApi.post("/chaza",{name,date:new Date(),location:"Por definir",photo:"Por definir",punctuation:-1});
            await startUpdateUser({...user,chaza:data.cid});
            dispatch(onNewChaza({_id:data.cid, name:data.name, location:data.location, photo:data.photo, punctuation:data.punctuation, date:data.date}));
            
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingChazas=async()=>{
        try {
            const {data}=await chazaApi.get("/chaza");
            dispatch(onLoadChazas(data.chazas));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingChazasId=async(id)=>{
        try {
            const {data}=await chazaApi.get("/chaza/"+id);
            dispatch(onChangeCurrentChaza(data.chaza));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadCurrentChaza=(chaza)=>{
        dispatch(onChangeCurrentChaza(chaza));
    }

    const startFilterChaza=async(filter)=>{
        try {
            const {data}=await chazaApi.get("/chaza");
            let chazasFilter=data.chazas;

            chazasFilter=getFilteredChazas(filter,chazasFilter);
            
            dispatch(onLoadChazas(chazasFilter));
        } catch (error) {
            console.log(error);
        }
    }

    return {
        chazas,
        currentChaza,

        startDeleteChaza,
        startNewChaza,
        startLoadingChazas,
        startLoadCurrentChaza,
        startLoadingChazasId,
        startFilterChaza
    }
}
