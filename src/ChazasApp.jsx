import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { Navbar } from "./chazas/components/Navbar"
import { Provider } from "react-redux"
import { store } from "./store"



export const ChazasApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
    
  )
}
