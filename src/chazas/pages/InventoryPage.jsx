import { useParams } from "react-router-dom"
import { ChazaFilter, ChazaInfo, ProductList } from "../components"
import { useAuthStore, useChazaStore, useProductStore, useUiStore } from "../../hook";
import { useEffect } from "react";


export const InventoryPage = () => {
  const {id}=useParams();
  const {startLoadingChazasId,currentChaza,startLoadCurrentChaza}=useChazaStore();
  const {user}=useAuthStore();
  const {products,startLoadingProducts,startCloseProduct}=useProductStore();

  if((user.chaza===undefined || user.chaza===null) && id===undefined){
    return (
      <h1>No tiene chaza</h1>
    );  
  }

  useEffect(() => {
    if(id===undefined && user.chaza && currentChaza._id!==user.chaza){
      startLoadingChazasId(user.chaza);
    }
  }, [id]);

  useEffect(() => {
    if(currentChaza._id){
      startLoadingProducts(currentChaza._id)
    }
    
  }, [currentChaza]);
  
  return (
    <div className='container text-center' >
        <div className="row-2 mt-4 mb-4">
          <ChazaInfo/>
          <ChazaFilter/>
          <ProductList/>
          {/* <ChazaResult/> */}
        </div>

        
      </div>
  )
}
