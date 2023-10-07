import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../auth";
import { AnnouncementPage, ChazasPage, HomePage, InventoryPage, LoadingPage, Navbar, UsersPage } from "../chazas";
import { useAuthStore, useChazaStore, useProductStore, useUiStore, useUserStore } from "../hook";
import { useEffect } from "react";
import { ModalComment, ModalPhoto } from "../chazas/components";



export const AppRouter = () => {

  const {status,checkToken,user}=useAuthStore();
  const {startUpdateChazaPhoto}=useChazaStore();
  const {closeModalPhoto,currentTypePhoto}=useUiStore();
  const {startUpdateProductPhoto}=useProductStore();
  const {startUpdateUserPhoto}=useUserStore();

  useEffect(() => {
    checkToken();
  }, []);
  
  if(status==="checking"){
    return (
      <LoadingPage/>
    )
  }

  const onPhotoChange=(photo)=>{
    const formData = new FormData();
    formData.append('photo', photo);
    
    if(currentTypePhoto==="chaza") startUpdateChazaPhoto(formData);

    if(currentTypePhoto==="product") startUpdateProductPhoto(formData);

    if(currentTypePhoto==="user") startUpdateUserPhoto(formData);

    closeModalPhoto();
  }

  return (
    <>
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
        <Route path="/chazas/:id" element={ <InventoryPage/>} />

      </Routes>

      <ModalPhoto make={onPhotoChange}/>
      <ModalComment/>
    </>
   
  )
}
