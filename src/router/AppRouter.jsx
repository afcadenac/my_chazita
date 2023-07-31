import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../auth";
import { ChazasPage, Navbar } from "../chazas";



export const AppRouter = () => {

    const authStatus = 'authenticated';


  return (
    <>
    {/* <Navbar/> */}
      <Routes>
          {
              (authStatus === 'authenticateds')  
              ? <Route path="/auth/*" element={ <ChazasPage/> } />
              : <Route path="/login" element={ <LoginPage/> } />
            }

          <Route path="/register" element={ <RegisterPage/> } />
          {/* <Route path="/*" element={ <Navigate to="/" /> } /> */}
          {/* <Route path="/*" element={ alert("La pagina no existe") } /> */}
      </Routes>
    </>
    
  )
}
