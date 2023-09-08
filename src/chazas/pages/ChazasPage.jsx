import { useEffect } from "react";
import { ChazaFilter, ChazaModal, ChazaResult } from "../components"
import { useAuthStore, useChazaStore, useUserStore } from "../../hook";
import 'animate.css';
import "../../styles.css"


export const ChazasPage = () => {

  const {startLoadUser}=useUserStore(); 

  const {startLoadingChazas}=useChazaStore();

  const {user}=useAuthStore();

  useEffect(() => {
    if(user.type==="Administrador"){
      startLoadUser();
    }
  }, []);

  useEffect(() => {
    startLoadingChazas();
  }, []);
  return (
   
      <div className='container text-center bgeneral animate__animated animate__fadeInUp' >
        
        
          <ChazaFilter/>
          <ChazaResult/>
        
          <ChazaModal/>

          
      </div>
    
  )
}
