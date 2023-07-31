import { NavLink } from "react-router-dom"
import { LoginPage } from "../../auth"


export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
        {/* <i className="bi bi-shop"></i>           */}
        <i className="fa-solid fa-store"></i>
        &nbsp;
            Andres

        </span>

      <NavLink to='/login'>
        <button className="btn btn-primary">
          <i className="fa-solid fa-user me-2"></i>
            <span>Ingresar</span>  
        </button> 
      </NavLink>
    </div>
  )
}
