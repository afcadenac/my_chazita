import { useDispatch, useSelector } from "react-redux"
import { onChangeCurrentChaza, onCloseModal, onDeleteChaza, onLoadChazas, onNewChaza, onUpdateChaza } from "../store";
import chazaApi from "../api/ChazaApi";
import { useUserStore } from "./useUserStore";
import { getFilteredChazas } from "../helpers";
import { useProductStore } from "./useProductStore";


export const useChazaStore = () => {

    const {chazas,currentChaza}=useSelector((state)=>state.chaza);
    const dispatch=useDispatch();

    const {startUpdateUser,users}=useUserStore();
    const {startDeleteProduct}=useProductStore();

    const startDeleteChaza=async(id)=>{
        try {
            const resp=await chazaApi.delete(`/chaza/${id}`);       
            users.forEach(user => {
                if(user.chaza===id){
                    startUpdateUser({...user,chaza:null});
                }
            });

            const {data}=await chazaApi.post("/product/getProducts",{chaza:id});
            data.product.forEach((product)=>{
                startDeleteProduct(product);
            });

            await chazaApi.post("/image/delete",{path:resp.data.chazaDeleted.photo});

            dispatch(onDeleteChaza(id));
        } catch (error) {
            console.log(error);
        }
    }

    const startNewChaza=async(user,name)=>{
        try {
            const {data}=await chazaApi.post("/chaza",{name,date:new Date(),location:"Por definir",photo:"Por definir",punctuation:-1});
            await startUpdateUser({...user,chaza:data.cid});
            dispatch(onNewChaza({_id:data.cid, name:data.name, photo:data.photo, punctuation:data.punctuation, date:data.date, lat:data.lat, lon:data.lon}));
            
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdateChaza=async(chaza)=>{
        try {
            await chazaApi.put("/chaza/"+chaza._id,{...chaza});
            dispatch(onUpdateChaza(chaza));
            dispatch(onChangeCurrentChaza(chaza));
            dispatch(onCloseModal());
            
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdateChazaPhoto=async(photo)=>{
        try {
            await chazaApi.post("/image/delete",{path:currentChaza.photo});
            const {data}=await chazaApi.post("/image",photo);

            await startUpdateChaza({...currentChaza,photo:data.url});
            dispatch(onCloseModal()); 
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
        startFilterChaza,
        startUpdateChaza,
        startUpdateChazaPhoto
    }
}
