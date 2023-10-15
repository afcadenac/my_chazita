import { useDispatch, useSelector } from "react-redux"
import { onChangeCurrentChaza, onChangeCurrentOwner, onChangeCurrentPunctuation, onChecking, onCloseModal, onCloseModalLocation, onCloseModalNetwork, onCloseModalPhone, onCloseModalPunctuation, onDeleteChaza, onDeleteNetwork, onDeletePhone, onLoadChazas, onLoadCurrentNetwork, onLoadCurrentPhones, onLoadProducts, onNewChaza, onNewNetwork, onNewPhone, onOpenModalLocation, onOpenModalNetwork, onOpenModalPhone, onOpenModalPunctuation, onUpdateChaza, onfinished } from "../store";
import chazaApi from "../api/ChazaApi";
import { useUserStore } from "./useUserStore";
import { getFilteredChazas } from "../helpers";
import { useProductStore } from "./useProductStore";
import { useAuthStore } from "./useAuthStore";
import { useCommentStore } from "./useCommentStore";
import { useUiStore } from "./useUiStore";


export const useChazaStore = () => {

    const {chazas,currentChaza,currentPhones,isModalPhones,currentNetworks,isModalNetwork,currentOwner,isModalLocation,isModalPunctuation,currentPunctuation}=useSelector((state)=>state.chaza);
    const dispatch=useDispatch();
    const {status}=useAuthStore();

    const {startUpdateUser,users}=useUserStore();
    const {startDeleteProduct,startLoadingProducts}=useProductStore();
    const {startDeleteComment}=useCommentStore();
    const {ChangeIsLoading}=useUiStore();
    

    const startDeleteChaza=async(id)=>{
        try {

            const {data}=await chazaApi.post("/product/getProducts",{chaza:id});
            data.product.forEach((product)=>{
                startDeleteProduct(product);
            });

            const {data:data2}=await chazaApi.get("/chaza/phone/"+id);
            data2.phone.forEach((phone)=>{
                startDeletePhone(phone._id);
            });

            const {data:data3}=await chazaApi.get("/chaza/network/"+id);
            data3.network.forEach((network)=>{
                startDeleteNetwork(network._id);
            });

            const {data:data4}=await chazaApi.post(`/comment/`,{chaza:id});
            data4.comments.forEach((comment)=>{
                startDeleteComment(comment._id);
            });

            const {data:data5}=await chazaApi.get(`/chaza/punctuation/all/${id}`);
            data5.punctuations.forEach((punctuation)=>{
                startDeleteDirectPunctuationUser(punctuation);
            });
     
            users.forEach(user => {
                if(user.chaza===id){
                    startUpdateUser({...user,chaza:null,type:"Cliente"});
                }
            });
            const resp=await chazaApi.delete(`/chaza/${id}`);  

            await chazaApi.post("/image/delete",{path:resp.data.chazaDeleted.photo});

            dispatch(onDeleteChaza(id));
        } catch (error) {
            console.log(error);
        }
    }

    const startNewChaza=async(user,name)=>{
        try {
            const {data}=await chazaApi.post("/chaza",{name,date:new Date(),photo:"Por definir",punctuation:-1});
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
            dispatch(onCloseModalLocation());
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
            ChangeIsLoading(true);
            const {data}=await chazaApi.get("/chaza");
            dispatch(onLoadChazas(data.chazas));
            ChangeIsLoading(false);
        } catch (error) {
            console.log(error);
            ChangeIsLoading(false);
        }
    }

    const startLoadingChazasId=async(id)=>{
        try {
            ChangeIsLoading(true);

            const {data}=await chazaApi.get("/chaza/"+id);
            const {data:data2}=await chazaApi.get("/chaza/phone/"+data.chaza._id);
            const {data:data3}=await chazaApi.get("/chaza/network/"+data.chaza._id);
            const {data:data4}=await chazaApi.get("/user/owner/"+data.chaza._id);

            startLoadingProducts(data.chaza._id);
            
            dispatch(onChangeCurrentChaza(data.chaza));
            dispatch(onLoadCurrentPhones(data2.phone));
            dispatch(onLoadCurrentNetwork(data3.network));
            dispatch(onChangeCurrentOwner({owner: data4.user.name}));

            ChangeIsLoading(false);
        } catch (error) {
            console.log(error);
            ChangeIsLoading(false);
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

    const startCloseLocation=()=>{
        dispatch(onCloseModalLocation());
    }

    const startOpenLocation=()=>{
        dispatch(onOpenModalLocation());
    }

    const startClosePunctuation=()=>{
        dispatch(onCloseModalPunctuation());
        dispatch(onChangeCurrentPunctuation({value:0}));
    }

    const startOpenPunctuation=()=>{
        if(status==="authenticated") startLoadingPunctuationUser();
        dispatch(onOpenModalPunctuation());
    }

    const startUpdateCurrentPunctuation=(punctuation)=>{
        dispatch(onChangeCurrentPunctuation(punctuation));
    }

    const startLoadingPunctuationUser=async()=>{
        try {
            const {data}=await chazaApi.get(`/chaza/punctuation/user/${currentChaza._id}`);
            console.log(data);
            if(data.ok) dispatch(onChangeCurrentPunctuation(data.punctuation));
        } catch (error) {
            console.log(error);
        }
    }

    const startNewPunctuationUser=async(punctuation)=>{
        try {
            const {data}=await chazaApi.post(`/chaza/punctuation/`,punctuation);
            const {data:data2}=await chazaApi.get(`/chaza/punctuation/${currentChaza._id}`);
            
            startUpdateChaza({...currentChaza,punctuation:data2.punctuation});
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdatePunctuationUser=async(punctuation)=>{
        try {
            const {data}=await chazaApi.put(`/chaza/punctuation/${punctuation._id}`,punctuation);
            const {data:data2}=await chazaApi.get(`/chaza/punctuation/${currentChaza._id}`);

            startUpdateChaza({...currentChaza,punctuation:data2.punctuation});
        } catch (error) {
            console.log(error);
        }
    }

    const startDeletePunctuationUser=async(punctuation)=>{
        try {
            const {data}=await chazaApi.delete(`/chaza/punctuation/${punctuation._id}`);
            console.log(data);
            const {data:data2}=await chazaApi.get(`/chaza/punctuation/${currentChaza._id}`);
            
            console.log(data2.punctuation);

            startUpdateChaza({...currentChaza,punctuation:data2.punctuation});
        } catch (error) {
            console.log(error);
        }
    }

    const startDeleteDirectPunctuationUser=async(punctuation)=>{
        try {
            await chazaApi.delete(`/chaza/punctuation/${punctuation._id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        chazas,
        currentChaza,
        currentPhones,
        isModalPhones,
        currentNetworks,
        isModalNetwork,
        currentOwner,
        isModalLocation,
        isModalPunctuation,
        currentPunctuation,

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
        startResetState,
        startOpenLocation,
        startCloseLocation,
        startOpenPunctuation,
        startClosePunctuation,
        startUpdateCurrentPunctuation,
        startLoadingPunctuationUser,
        startNewPunctuationUser,
        startUpdatePunctuationUser,
        startDeletePunctuationUser
    }
}
