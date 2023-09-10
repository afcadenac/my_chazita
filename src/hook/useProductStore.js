import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onCloseModalPhoto, onDeleteProduct, onLoadProducts, onNewProduct, onUpdateProduct } from "../store";
import chazaApi from "../api/ChazaApi";
import { useUserStore } from "./useUserStore";
import { useAuthStore } from "./useAuthStore";
import { getFilteredProducts } from "../helpers";
import { useUiStore } from "./useUiStore";


export const useProductStore = () => {

    const {products,currentProduct}=useSelector((state)=>state.product);
    const dispatch=useDispatch();

    const {startUpdateUser,users}=useUserStore();
    const {user}=useAuthStore();
    const {currentValue}=useUiStore();

    const startDeleteProduct=async(product)=>{
        try {
            const {data}=await chazaApi.delete(`/product/${product._id}`,{chaza:product.chaza});

            await chazaApi.post("/image/delete",{path:data.productDeleted.photo});

            dispatch(onDeleteProduct(product));
        } catch (error) {
            console.log(error);
        }
    }

    const startNewProduct=async(product)=>{
        try {
            const {data}=await chazaApi.post("/product",{...product,chaza:user.chaza,photo:"Por definir"});
            dispatch(onNewProduct({...product,_id:data.pid,chaza:user.chaza,photo:"Por definir"}));
            dispatch(onCloseModal());
            
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdateProduct=async(product)=>{
        try {
            await chazaApi.put("/product/"+product._id,{...product});
            dispatch(onUpdateProduct(product));
            dispatch(onCloseModal()); 
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdateProductPhoto=async(photo)=>{
        try {
            await chazaApi.post("/image/delete",{path:currentValue.photo});
            const {data}=await chazaApi.post("/image",photo);

            await startUpdateProduct({...currentValue,photo:data.url});
            dispatch(onCloseModalPhoto()); 
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingProducts=async(id_chaza)=>{
        try {
            const {data}=await chazaApi.post("/product/getProducts",{chaza:id_chaza});

            dispatch(onLoadProducts(data.product));
        } catch (error) {
            console.log(error);
        }
    }

    const startCloseProduct=async(value)=>{
        dispatch(onLoadProducts(value));
    }

    const startFilterProduct=async(filter,id_chaza)=>{
        try {
            const {data}=await chazaApi.post("/product/getProducts",{chaza:id_chaza});
            let productFilter=data.product;

            productFilter=getFilteredProducts(filter,productFilter);

            dispatch(onLoadProducts(productFilter));
        } catch (error) {
            console.log();
        }
    }

    // const startLoadingChazasId=async(id)=>{
    //     try {
    //         const {data}=await chazaApi.get("/chaza/"+id);
    //         dispatch(onChangeCurrentChaza(data.chaza));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const startLoadCurrentChaza=(chaza)=>{
    //     dispatch(onChangeCurrentChaza(chaza));
    // }

    return {
        products,
        currentProduct,

        startLoadingProducts,
        startDeleteProduct,
        startNewProduct,
        startUpdateProduct,
        startFilterProduct,
        startUpdateProductPhoto,

        startCloseProduct
    }
}
