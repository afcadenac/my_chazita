import { useNavigate } from "react-router-dom";
import { useAuthStore, useChazaStore } from "../../hook";
import "../../styles.css";
import { getEnvVariables } from "../../helpers";
import placeholderImage from "../../assets/images/imageDefault.jpg";
import { RatingChazas } from "./RatingChazas";
import { MapaChazas } from "./MapaChazas";

import  "../../styles.css"

export const ChazaCard = ({ chaza = {} }) => {
  const { user } = useAuthStore();
  const { startDeleteChaza, startLoadCurrentChaza,startLoadingChazasId } = useChazaStore();
  const navigate = useNavigate();

  const deleteChaza = (id) => {
    startDeleteChaza(id);
  };

  const onNavigateChaza = (id) => {
    navigate("/chazas/" + id);
  };

  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <div
      className="row  mt-2 mb-2 pt-2 pb-2 border border-black espace-pointer chazaCard"
      onClick={() => {
        startLoadingChazasId(chaza._id);
      }}
      onDoubleClick={() => {onNavigateChaza(chaza._id)}}
    >
      <div className="col-sm-2 divIMG">
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

      <div className={`row col-sm-${user.type === "Administrador" ? 9 : 10} ` }>
        <div className="col mt-2 mb-2 ms-2 d-flex justify-content-center align-items-center divCha">
          <h6 className="texts">Nombre: {chaza.name}</h6>
        </div>
        <div className="col mt-2 mb-2 ms-2 d-flex justify-content-center align-items-center divCha">      
          <RatingChazas score={chaza.punctuation} />
        </div>
        <div className="col mt-2 mb-2 ms-2 d-flex justify-content-center align-items-center divCha">
          <h6>
            Fecha de creacion: {new Date(chaza.date).getDate() + 1}-
            {new Date(chaza.date).getMonth() + 1}-
            {new Date(chaza.date).getFullYear()}{" "}
            {new Date(chaza.date).getHours() + 1}:
            {new Date(chaza.date).getMinutes() + 1}:
            {new Date(chaza.date).getSeconds()}
          </h6>
        </div>
        <div className="  mt-2 mb-2 pe-0 d-flex justify-content-center align-items-center mapachaza"> 
          <MapaChazas lat={chaza.lat} lon={chaza.lon} nameChaza={chaza.name}/>
          
        </div>
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
