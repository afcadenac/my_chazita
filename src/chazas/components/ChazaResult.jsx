import { useAuthStore, useUiStore } from "../../hook";
import { ChazaList } from "./";

export const ChazaResult = () => {
  const {user}=useAuthStore();
  const {isModalOpen,openModal}=useUiStore();
  return (
    <div className='row'>
      <ChazaList/>
      {
        (user.type==="Administrador")
        ?(
          <div className="mb-3">
            <button className="btn btn-secondary" onClick={openModal}>Nuevo</button>
          </div>
        )
        :""
      }
    </div>
  )
}
