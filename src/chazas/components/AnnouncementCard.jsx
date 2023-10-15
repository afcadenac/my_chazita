import placeholderImage from "../../assets/images/imageDefault.jpg";
import { getEnvVariables } from "../../helpers";
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

  return (
    <div
      className="card cardshadow  p-0 border-dark animate__animated animate__fadeInUp "
      onClick={() => startChangeCurrentAnnouncement(announcement)}
      onDoubleClick={onOpenModalAnnouncement}
    >
      <div className="row g-0 imgp">
        <div className="col-md-4 allcard">
          <img
            src={
              announcement.photo === "Por definir" ||
              announcement.photo === undefined ||
              announcement.photo === null
                ? placeholderImage
                : getEnvVariables().VITE_PHOTO_URL + announcement.photo
            }
            className="img-fluid rounded-start imag"
            alt="..."
          />
        </div>

        <div className="col-md-4 ">
          <div className="card-body ">
            <h5 className="card-title texts">{announcement.title}</h5>
            <div className="row mt-2 mb-2">
              <span className="col">Precio: {announcement.price}</span>
              <span className="col">Fecha: {announcement.date}</span>
              <span className="col texts">Tipo: {announcement.type}</span>
            </div>
            <p className="card-text ">
              <small className="text-muted texts">
                Descripcion: {announcement.description}
              </small>
            </p>
            {((user.uid === announcement.user || user.type === "Administrador") && status==="authenticated") && (
              <>
                {/* <button
                  className="btn btn-primary mb-2 mx-2"
                >
                  cambiar foto
                </button> */}
                <button
                  className="btn btn-danger mb-2"
                  onClick={()=>{startDeleteAnnouncement(announcement)}}
                >
                  eliminar
                </button>
              </>
            )}
          </div>
        </div>

        <div className="col-md-4 allcard">
            <MapaChazas lat={announcement.lat} lon={announcement.lon} nameChaza={announcement.title}/>
        </div>
        
      </div>
    </div>
  )
}
