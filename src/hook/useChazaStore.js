import { useDispatch, useSelector } from "react-redux"
import { onChangeCurrentChaza, onChangeCurrentOwner, onChecking, onCloseModal, onCloseModalNetwork, onCloseModalPhone, onDeleteChaza, onDeleteNetwork, onDeletePhone, onLoadChazas, onLoadCurrentNetwork, onLoadCurrentPhones, onLoadProducts, onNewChaza, onNewNetwork, onNewPhone, onOpenModalNetwork, onOpenModalPhone, onUpdateChaza, onfinished } from "../store";
import chazaApi from "../api/ChazaApi";
import { useUserStore } from "./useUserStore";
import { getFilteredChazas } from "../helpers";
import { useProductStore } from "./useProductStore";


export const useChazaStore = () => {

    const {chazas,currentChaza,currentPhones,isModalPhones,currentNetworks,isModalNetwork,currentOwner}=useSelector((state)=>state.chaza);
    const dispatch=useDispatch();

    const {startUpdateUser,users}=useUserStore();
    const {startDeleteProduct,startLoadingProducts}=useProductStore();
    

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
            //dispatch(onChecking());
            const {data}=await chazaApi.get("/chaza/"+id);
            const {data:data2}=await chazaApi.get("/chaza/phone/"+data.chaza._id);
            const {data:data3}=await chazaApi.get("/chaza/network/"+data.chaza._id);
            const {data:data4}=await chazaApi.get("/user/owner/"+data.chaza._id);

            startLoadingProducts(data.chaza._id);
            
            dispatch(onChangeCurrentChaza(data.chaza));
            dispatch(onLoadCurrentPhones(data2.phone));
            dispatch(onLoadCurrentNetwork(data3.network));
            dispatch(onChangeCurrentOwner({owner: data4.user.name}));

            //dispatch(onfinished());
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

    const startClosePhone=()=>{
        dispatch(onCloseModalPhone());
    }

    const startOpenPhone=()=>{
        dispatch(onOpenModalPhone());
    }

    const startNewPhone=async(chazaId,phone)=>{
        try {
            const {data}=await chazaApi.post("/chaza/phone",{chaza:chazaId,value:phone});
            dispatch(onNewPhone({_id:data._id,chaza:data.chaza,value:data.value}));
            
        } catch (error) {
            console.log(error);
        }
    }

    const startDeletePhone=async(id)=>{
        try {
            const {data}=await chazaApi.delete("/chaza/phone/"+id);
            dispatch(onDeletePhone(id));
            
        } catch (error) {
            console.log(error);
        }
    }

    const startCloseNetwork=()=>{
        dispatch(onCloseModalNetwork());
    }

    const startOpenNetwork=()=>{
        dispatch(onOpenModalNetwork());
    }

    const startNewNetwork=async(chazaId,network,link)=>{
        try {
            const {data}=await chazaApi.post("/chaza/network",{chaza:chazaId,value:network,link:link});
            dispatch(onNewNetwork({_id:data._id,chaza:data.chaza,value:data.value,link:data.link}));
            
        } catch (error) {
            console.log(error);
        }
    }

    const startDeleteNetwork=async(id)=>{
        try {
            const {data}=await chazaApi.delete("/chaza/network/"+id);
            dispatch(onDeleteNetwork(id));
            
        } catch (error) {
            console.log(error);
        }
    }



    const startResetState=async(id)=>{
        dispatch(onChangeCurrentChaza({}));
        dispatch(onLoadCurrentPhones([]));
        dispatch(onLoadCurrentNetwork([]));
        dispatch(onChangeCurrentOwner({}));

        dispatch(onLoadProducts([]));
    }

    return {
        chazas,
        currentChaza,
        currentPhones,
        isModalPhones,
        currentNetworks,
        isModalNetwork,
        currentOwner,

        startDeleteChaza,
        startNewChaza,
        startLoadingChazas,
        startLoadCurrentChaza,
        startLoadingChazasId,
        startFilterChaza,
        startUpdateChaza,
        startUpdateChazaPhoto,
        startClosePhone,
        startOpenPhone,
        startNewPhone,
        startDeletePhone,
        startOpenNetwork,
        startCloseNetwork,
        startDeleteNetwork,
        startNewNetwork,
        startResetState
    }
}
