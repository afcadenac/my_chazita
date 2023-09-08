import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../hook";

import "../../styles.css";

export const Navbar = () => {

  const {status,startLogout,user}=useAuthStore();

  const navigate=useNavigate();
  const onLogin=()=>{
    navigate("/auth/login");
  }

  const onLogout=()=>{
    startLogout();
    navigate("/auth/login");
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark navbg p-2">
      
      <Link to="/" className="navbar-brand ms-4 me-5">Home</Link>

      <div className="navbar-collapse">

        <div className="navbar-nav">

          <NavLink to="/chazas" className={({isActive})=>`nav-item nav-link ${isActive?"active":""}`}>
            Chazas
          </NavLink>

          {
            (user.type==="Dueño")
            ?
            <NavLink to="/inventory" className={({isActive})=>`nav-item nav-link ${isActive?"active":""}`}>
              inventario
            </NavLink>
            :""
          }

          <NavLink to="/announcement" className={({isActive})=>`nav-item nav-link ${isActive?"active":""}`}>
            Anuncios
          </NavLink>

          {
            (user.type==="Administrador")
            ?
            <NavLink to="/users" className={({isActive})=>`nav-item nav-link ${isActive?"active":""}`}>
              Usuarios
            </NavLink>
            :""
          }
          
        </div>       
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
          <ul className="navbar-nav ml-auto">
              
            <span className='nav-item nav-link text-primary'>{user.name}</span>

            {
              (status==="not-authenticated")
              ?<button className='btn btnav text-white me-4' onClick={onLogin}>Ingresar</button>
              :<button className='btn btnav text-white me-4' onClick={onLogout}>Salir</button>
            }

          </ul>
      </div>

    </nav>
  )
}
