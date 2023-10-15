import { useEffect } from "react";
import { useAnnouncementStore } from "../../hook/useAnnouncementStore";
import { AnnouncementList, ChazaFilter, ModalAnnouncement } from "../components"
import { useUiStore } from "../../hook";
import { LoadingPage } from "./LoadingPage";


export const AnnouncementPage = () => {

  const {announcements,startLoadAnnouncement,startFilterAnnouncement}=useAnnouncementStore();

  const {isLoadingRequest}=useUiStore();

  useEffect(() => {
    startLoadAnnouncement();
  }, [])
  

  const onFilter=(filter)=>{
    console.log(filter)
    startFilterAnnouncement(filter);
  }

  if(isLoadingRequest){
    return <LoadingPage/>
  }

  return (
    <>
      <div className='container text-center filtro' >
        <div className="container text-center bgeneral animate__animated animate__fadeInUp chazacont">

          <ChazaFilter
          filter={{
            type:"ninguno",
            date:"ninguno",
            myAnnouncements:"ninguno",
            order:"ninguno",
            
          }} 
          config={{
            type:["ninguno","Comida","Objetos perdidos","Eventos","informativo","Otros"],
            date:["ninguno","menos de un mes","entre 1 a 6 meses","entre 6 meses a un año","mas de un años"],
            myAnnouncements:["ninguno","Mis anuncios"],
            order:["ninguno","Ascendente","descendente"],
            
          }}
          cb={onFilter}
          />

          <AnnouncementList/>

        </div>
      </div>

      <ModalAnnouncement/>
    </>
  )
}
