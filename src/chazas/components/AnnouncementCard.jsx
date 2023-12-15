import Swal from "sweetalert2";
import placeholderImage from "../../assets/images/imageDefault.jpg";
import { getDateString, getEnvVariables } from "../../helpers";
import { useAuthStore } from "../../hook";
import { useAnnouncementStore } from "../../hook/useAnnouncementStore";
import { MapaChazas } from "./MapaChazas";

export const AnnouncementCard = ({announcement}) => {

    const {user,status}=useAuthStore();
    const {startDeleteAnnouncement,startChangeCurrentAnnouncement,startOpenAnnouncement}=useAnnouncementStore();

    const onOpenModalAnnouncement=()=>{
      if(user.uid===announcement.user){
        startOpenAnnouncement()
      }
    }

    const onDeleteAnnouncement=(deleteAnnouncement)=>{
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText:"Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          startDeleteAnnouncement(deleteAnnouncement);
          Swal.fire(
            '¡Eliminado!',
            'El anuncio ha sido eliminado.',
            'success'
          )
        }
      });
    }

  return (
    <div
      className="card card-border cardshadow  p-0 border-dark animate__animated animate__fadeInUp "
      onClick={() => startChangeCurrentAnnouncement(announcement)}
      onDoubleClick={onOpenModalAnnouncement}
    >
      <div className="row g-0 imgp">
        <div className="col-md-4 divIMG px-2 ">
          <img
            src={
              announcement.photo === "Por definir" ||
              announcement.photo === undefined ||
              announcement.photo === null
                ? placeholderImage
                : getEnvVariables().VITE_PHOTO_URL + announcement.photo
            }
            className="card-img border border-black card-photo"
            alt="..."
          />
        </div>

        <div className="my-2 px-2 d-flex justify-content-center align-items-center col-lg-4 ">
          <div className="card-body ">
            <h5 className="card-title texts">{announcement.title}</h5>
            <div className="row mt-2 mb-2">
              <span className="col">Precio: {announcement.price}</span>
              <span className="col">Fecha: {getDateString(announcement.date)}</span>
              <span className="col texts">Tipo: {announcement.type}</span>
            </div>
            <p className="card-text ">
              <small className="text-muted texts">
                Descripcion: {announcement.description}
              </small>
            </p>
            
          </div>
        </div>

        <div className="my-2 px-2 d-flex justify-content-center align-items-center col-lg-4">
            <MapaChazas lat={announcement.lat} lon={announcement.lon} nameChaza={announcement.title}/>
        </div>
        
      </div>

      <div className="d-flex justify-content-center align-items-center">
      {((user.uid === announcement.user || user.type === "Administrador") && status==="authenticated") && (
        <>
          {/* <button
            className="btn btn-primary mb-2 mx-2"
          >
            cambiar foto
          </button> */}
          <button
            className="btn btn-danger mb-2"
            onClick={()=>{onDeleteAnnouncement(announcement)}}
          >
            eliminar
          </button>
        </>
      )}
      </div>
      
    </div>
  )
}
