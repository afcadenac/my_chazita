import { useEffect } from "react";
import { ChazaFilter, ChazaModal, ChazaResult } from "../components"
import { useAuthStore, useChazaStore, useUserStore } from "../../hook";


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
    <>
      <div className='container text-center' >
        <div className="row-2 mt-4 mb-4">

          <ChazaFilter 
          filter={{
            punctuation:"ninguno",
            date:"ninguno",
            order:"Ascendente"
          }} 
          config={{
            punctuation:["ninguno","mayor a 1","mayor a 2","mayor a 3", "mayor a 4","sobre 5"],
            date:["ninguno","mas de un mes","mas de seis mes","mas de un año","mas de dos años"],
            order:["Ascendente","descendente"]
          }}
          />
          
          <ChazaResult/>
        </div>
        <ChazaModal/>
      </div>
    </>
  )
}
