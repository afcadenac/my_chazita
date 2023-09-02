import { useEffect } from "react";
import { ChazaFilter, ChazaModal, ChazaResult } from "../components"
import { useAuthStore, useChazaStore, useUserStore } from "../../hook";


export const ChazasPage = () => {

  const {startLoadUser}=useUserStore(); 

  const {startLoadingChazas,startFilterChaza}=useChazaStore();

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

  return (
    <>
      <div className='container text-center' >
        <div className="row-2 mt-4 mb-4">

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
        </div>
        <ChazaModal/>
      </div>
    </>
  )
}
