import { useNavigate } from "react-router-dom";
import { useAuthStore, useChazaStore } from "../../hook";
import "../../styles.css";
import { getDateString, getEnvVariables } from "../../helpers";
import placeholderImage from "../../assets/images/imageDefault.jpg";
import { RatingChazas } from "./RatingChazas";
import { MapaChazas } from "./MapaChazas";

import  "../../styles.css"
import Swal from "sweetalert2";

export const ChazaCard = ({ chaza = {} }) => {
  const { user } = useAuthStore();
  const { startDeleteChaza, startLoadCurrentChaza } = useChazaStore();
  const navigate = useNavigate();

  const deleteChaza = (id) => {
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
        startDeleteChaza(id);
        Swal.fire(
          '¡Eliminado!',
          'La chaza ha sido eliminada.',
          'success'
        )
      }
    });
    
  };

  const onNavigateChaza = (id) => {
    navigate("/chazas/" + id);
  };

  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <div
      className="row cardshadow mb-4 py-2 border border-black espace-pointer chazaCard animate__animated "
      onClick={() => {
        startLoadCurrentChaza(chaza._id);
      }}
      onDoubleClick={() => {onNavigateChaza(chaza._id)}}
    >
      <div className="col-md-3 divIMG px-2 m-0">
        <img
          src={
            
            chaza.photo === "Por definir" ||
            chaza.photo === undefined ||
            chaza.photo === null
              ? placeholderImage
              : getEnvVariables().VITE_PHOTO_URL + chaza.photo
          }
          alt={chaza.name}
          className="card-img border border-black"
          onError={handleImageError}
        />
      </div>

      <div className={`row m-0 col-md-${user.type === "Administrador" ? 5/* -1 */ : 5} ` }>
        <div className="col my-2 mx-1 d-flex justify-content-center align-items-center divCha">
          <h6 className="texts">Nombre: {chaza.name}</h6>
        </div>
        <div className="col my-2 mx-1 d-flex justify-content-center align-items-center divCha">      
          <RatingChazas score={chaza.punctuation} />
        </div>
        <div className="col my-2 mx-1 d-flex justify-content-center align-items-center divCha">
          <h6>
            Fecha de creacion: {getDateString(chaza.date)}
          </h6>
        </div>
        
      </div>

      <div className="my-2 px-2 d-flex justify-content-center align-items-center col-md-4 m-0"> 
          <MapaChazas lat={chaza.lat} lon={chaza.lon} nameChaza={chaza.name}/>
          
        </div>
      {user.type === "Administrador" ? (
        <div className="col d-flex justify-content-center align-items-center">
          <button
            className="btn btn-danger"
            onClick={() => deleteChaza(chaza._id)}
          >
            Eliminar
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
