import { useLocation, useParams } from "react-router-dom"
import { ChazaFilter, ChazaInfo, ProductList } from "../components"
import { useAuthStore, useChazaStore, useProductStore, useUiStore } from "../../hook";
import { useEffect } from "react";
import { LoadingPage } from "./LoadingPage";


export const InventoryPage = () => {
  const {id}=useParams();
  const {startLoadingChazasId,currentChaza,startResetState}=useChazaStore();
  const {user}=useAuthStore();
  const {startFilterProduct}=useProductStore();

  const location = useLocation();

  if((user.chaza===undefined || user.chaza===null) && id===undefined){
    return (
      <h1>No tiene chaza</h1>
    );  
  }

  useEffect(() => {
    startResetState();
  }, [location.pathname]);
  

  useEffect(() => {
    if(id===undefined && user.chaza /*&& currentChaza._id!==user.chaza*/){
      startLoadingChazasId(user.chaza);
    }
    if(id && !currentChaza._id){
      startLoadingChazasId(id)
    }
  }, [id]);

  const onFilter=(filter)=>{
    //startLoadingProducts(currentChaza._id);
    startFilterProduct(filter,currentChaza._id);
  }
  
  if(!currentChaza._id){
    return <LoadingPage/>
  }
  return (
    <div className='container text-center' >
        <div className="row-2 mt-4 mb-4">
          <ChazaInfo/>

          <ChazaFilter
          filter={{
            price:"ninguno",
            type:"ninguno",
            stock:"ninguno",
            order:"ninguno"
          }} 
          config={{
            price:["ninguno","menor a 1000","entre 1000 y 3000","entre 3000 y 5000", "entre 5000 y 10000","mayor a 10000"],
            type:["ninguno","bebida","comida","servicio","otro"],
            order:["ninguno","Ascendente","descendente"],
            stock:["ninguno","0 elementos","entre 1 y 5 elementos","entre 5 y 10 elementos","entre 10 y 20 elementos","mas 20 elementos"]
          }}
          cb={onFilter}
          />
           
          <ProductList/>
          {/* <ChazaResult/> */}
        </div>

        
      </div>
  )
}
