import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../auth";
import { AnnouncementPage, ChazasPage, HomePage, InventoryPage, Navbar, UsersPage } from "../chazas";
import { useAuthStore } from "../hook";
import { useEffect } from "react";



export const AppRouter = () => {

  const {status,checkToken,user}=useAuthStore();

  useEffect(() => {
    checkToken();
  }, []);
  
  if(status==="checking"){
    return (
      <h2>Cargando...</h2>
    )
  }

  return (
    <Routes>

      {
        (status==="not-authenticated")
        ?(
          <>
            <Route path="/auth/register" element={ <RegisterPage/> } />
            <Route path="/auth/login" element={ <LoginPage/> } />
          </>
        )
        :(
          <Route path="/auth/*" element={ <Navigate to="/chazas"/> } />
        )
      }

      {
        (user.type==="Administrador")
        ?<Route path="/users" element={<UsersPage/>}/>
        :""
      }

      {
        (user.type==="Dueño")
        ?<Route path="/inventory" element={<InventoryPage/>}/>
        :""
      }
      
      <Route path="/" element={ <HomePage/> } />
      <Route path="/chazas" element={ <ChazasPage/> } />
      <Route path="/announcement" element={ <AnnouncementPage/> } />
      <Route path="/*" element={ <Navigate to="/"/> } />

    </Routes>
  )
}
