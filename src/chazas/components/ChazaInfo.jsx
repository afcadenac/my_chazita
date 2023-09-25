import { getEnvVariables } from "../../helpers";
import {
  useAuthStore,
  useChazaStore,
  useProductStore,
  useUiStore,
} from "../../hook";
import placeholderImage from "../../assets/images/imageDefault.jpg";

import "../../styles.css";
import { RatingChazas } from "./RatingChazas";

export const ChazaInfo = () => {
  const { currentChaza } = useChazaStore();
  const { user } = useAuthStore();
  const { openModalPhoto, ChangeTypePhoto } = useUiStore();

  const onOpenModalPhoto = () => {
    ChangeTypePhoto("chaza");
    openModalPhoto();
  };

  return (
    <div className="card bg-dark text-white">
      <img
        src={
          currentChaza.photo === "Por definir" ||
          currentChaza.photo === undefined ||
          currentChaza.photo === null
            ? placeholderImage
            : getEnvVariables().VITE_PHOTO_URL + currentChaza.photo
        }
        className="card-img info"
        alt="..."
      />
      <div className="card-img-overlay overlay-text d-block">
        <h5 className="card-title d-flex justify-content-center">
          Nombre: {currentChaza.name}
        </h5>
        <div className="card-text d-flex justify-content-center gap-5 mb-4">
          <span className="mb-1">Creación: {currentChaza.date}</span>
          <RatingChazas score={currentChaza.punctuation} />  
        </div>

        <p className="card-text d-flex justify-content-center gap-5 mb-5">
          <span className="mb-1">
            Propietarios: andres felipe cadena cadena
          </span>
          <span className="mb-1">Telefonos: 3224040389, 34745874559</span>
          <span className="mb-1">Redes sociales: oscar, juancho</span>
        </p>
        <button className="btn btn-info ">Ver comentarios</button>
        {user.chaza === currentChaza._id && (
          <button className="btn btn-primary mx-2" onClick={onOpenModalPhoto}>
            cambiar
          </button>
        )}
      </div>
    </div>

    /*{<div className="row  border border-dark bg-success mb-4 p-3">
      <div className="col-md-3"></div>}*/
  );
};
