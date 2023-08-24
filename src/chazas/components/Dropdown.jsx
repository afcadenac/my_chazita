import { useAuthStore } from "../../hook"


export const Dropdown = () => {
    const {startLogout,user}=useAuthStore();

    const onLogout=()=>{
        startLogout();
    }
  return (//devolver un dropdown que no de error xdddd
    <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {user.name}
        </button>
        <ul className="dropdown-menu dropdown-menu-dark">
            <li><a className="dropdown-item active" href="#">{user.type}</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" onClick={onLogout}>Cerrar sesion</a></li>
        </ul>
    </div>
  )
}
