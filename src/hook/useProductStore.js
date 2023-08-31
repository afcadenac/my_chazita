import { useDispatch, useSelector } from "react-redux"
import { onDeleteProduct, onLoadProducts, onNewProduct, onUpdateProduct } from "../store";
import chazaApi from "../api/ChazaApi";
import { useUserStore } from "./useUserStore";
import { useAuthStore } from "./useAuthStore";


export const useProductStore = () => {

    const {products,currentProduct}=useSelector((state)=>state.product);
    const dispatch=useDispatch();

    const {startUpdateUser,users}=useUserStore();
    const {user}=useAuthStore();

    const startDeleteProduct=async(product)=>{
        try {
            const {data}=await chazaApi.delete(`/product/${product._id}`,{chaza:product.chaza});

            console.log(data);

            dispatch(onDeleteProduct(product));
        } catch (error) {
            console.log(error);
        }
    }

    const startNewProduct=async(product)=>{
        try {
            const {data}=await chazaApi.post("/product",{...product,chaza:user.chaza});
            dispatch(onNewProduct({...product,_id:data.pid}));
            
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdateProduct=async(product)=>{
        try {
            await chazaApi.put("/product/"+product._id,{...product});
            dispatch(onUpdateProduct(product));
            
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

        startCloseProduct
    }
}
