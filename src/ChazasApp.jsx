import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { Navbar } from "./chazas/components/Navbar"


export const ChazasApp = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
       

    </BrowserRouter>
  )
}
