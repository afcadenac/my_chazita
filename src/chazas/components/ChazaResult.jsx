import { useAuthStore, useUiStore } from "../../hook";
import { ChazaList } from "./";

export const ChazaResult = () => {
  const {user}=useAuthStore();
  const {isModalOpen,openModal}=useUiStore();
  return (
    <div className='row  d-flex justify-content-between align-items-center prodlist'>
      <ChazaList/>
      {
        (user.type==="Administrador")
        ?(
          
            <button className="btn btn-secondary mb-0" onClick={openModal}>Nuevo</button>
          
        )
        :""
      }
    </div>
  )
}
