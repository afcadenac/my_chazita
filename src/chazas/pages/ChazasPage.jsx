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
          <ChazaFilter/>
          <ChazaResult/>
        </div>
        <ChazaModal/>
      </div>
    </>
  )
}
