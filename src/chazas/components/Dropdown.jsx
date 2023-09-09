import { getEnvVariables } from "../../helpers";
import { useAuthStore, useUiStore, useUserStore } from "../../hook"


export const Dropdown = () => {
    const {startLogout,user}=useAuthStore();
    const {openModalPhoto,ChangeTypePhoto}=useUiStore();
    const {startLoadUserById}=useUserStore();

    const onLogout=()=>{
        startLogout();
    }

    const onOpenModalPhoto=()=>{
        ChangeTypePhoto("user");
        startLoadUserById();
        openModalPhoto();
      }
  return (//devolver un dropdown que no de error xdddd
    <div className="dropdown me-2">
        <button className="btn dropdown-toggle p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={getEnvVariables().VITE_PHOTO_URL+user.photo} alt="foto" className="userPhoto"/>
        </button>
        <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
            <li><a className="dropdown-item" href="#">{user.name}</a></li>
            <li><a className="dropdown-item" href="#">{user.type}</a></li>
            <li><a className="dropdown-item" href="#">{user.email}</a></li>
            <li><a className="dropdown-item" href="#" onClick={onOpenModalPhoto}>cambiar foto</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" onClick={onLogout}>Cerrar sesion</a></li>
        </ul>
    </div>
  )
}
