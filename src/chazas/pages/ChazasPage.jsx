import { useEffect } from "react";
import { ChazaFilter, ChazaModal, ChazaResult } from "../components"
import { useAuthStore, useChazaStore, useUserStore } from "../../hook";
import 'animate.css';
import "../../styles.css"
import { LoadingPage } from "./LoadingPage";


export const ChazasPage = () => {

  const {startLoadUser}=useUserStore(); 

  const {startLoadingChazas,startFilterChaza,chazas}=useChazaStore();

  const {user}=useAuthStore();

  useEffect(() => {
    if(user.type==="Administrador"){
      startLoadUser();
    }
  }, []);

  useEffect(() => {
    startLoadingChazas();
  }, []);

  const onFilter=(filter)=>{
    startFilterChaza(filter);
  }

  if(chazas===null){
    return <LoadingPage/>
  }

  return (
    <>
      <div className='container text-center' >
        <div className="container text-center bgeneral animate__animated animate__fadeInUp">

          <ChazaFilter 
          filter={{
            punctuation:"ninguno",
            date:"ninguno",
            order:"ninguno"
          }} 
          config={{
            punctuation:["ninguno","mayor a 1","mayor a 2","mayor a 3", "mayor a 4","sobre 5"],
            date:["ninguno","menos de un mes","entre 1 a 6 meses","entre 6 meses a un año","mas de un años"],
            order:["ninguno","Ascendente","descendente"]
          }}
          cb={onFilter}
          />
          
          <ChazaResult/>
        
          <ChazaModal/>
        </div>
          
      </div>
    </>
    
  )
}
