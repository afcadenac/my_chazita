import { getEnvVariables } from "../../helpers";
import {
  useAuthStore,
  useChazaStore,
  useCommentStore,
  useProductStore,
  useUiStore,
} from "../../hook";
import placeholderImage from "../../assets/images/imageDefault.jpg";

import "../../styles.css";
import { RatingChazas } from "./RatingChazas";
import { ModalPhone } from "./ModalPhone";
import { ModalNetwork } from "./ModalNetwork";
import { ModalLocation } from "./ModalLocation";
import { ModalPunctuation } from "./ModalPunctuation";

export const ChazaInfo = () => {
  const { currentChaza,startOpenPhone,currentPhones,startOpenNetwork,currentNetworks,currentOwner,startOpenLocation,startOpenPunctuation } = useChazaStore();
  const { user,status } = useAuthStore();
  const { openModalPhoto, ChangeTypePhoto } = useUiStore();
  const {startLoadComments}=useCommentStore();

  const onOpenModalPhoto = () => {
    ChangeTypePhoto("chaza");
    openModalPhoto();
  };

  const onOpenModalComment=()=>{
    startLoadComments();
  }
  
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
          {user.chaza === currentChaza._id && (<button className="btn btn-primary" onClick={startOpenLocation}>editar nombre</button>)}
        </h5>
        <div className="card-text d-flex justify-content-center gap-5 mb-4">
          <span className="mb-1">Creación: {currentChaza.date}</span>
          <RatingChazas score={currentChaza.punctuation} />  
          {status === "authenticated" && (<button className="btn btn-primary" onClick={startOpenPunctuation}>puntuar</button>)}
        </div>

        <p className="card-text d-flex justify-content-center gap-5 mb-5">
          <span className="mb-1">
            Propietario: {currentOwner.owner}
          </span>
          <span className="mb-1">Telefonos:

            {currentPhones.map((phone)=>{
              return (<span key={phone._id} className="m-0"> {phone.value}, </span>)
            })} 
            {user.chaza === currentChaza._id && (<button className="btn btn-primary" onClick={startOpenPhone}>editar</button>)}
          
          </span>
          
          <span className="mb-1">Redes sociales: 
            {currentNetworks.map((network)=>{
              return (<a  key={network._id} className="m-0" href={network.link} target="_blank"> {network.value},</a>)
            })} 
            {user.chaza === currentChaza._id && (<button className="btn btn-primary" onClick={startOpenNetwork}>editar</button>)}
          </span>
        </p>
        <button className="btn btn-info " onClick={onOpenModalComment}>Ver comentarios</button>
        {user.chaza === currentChaza._id && (
          <button className="btn btn-primary mx-2" onClick={onOpenModalPhoto}>
            cambiar foto
          </button>
        )}
      </div>
      <ModalPhone/>
      <ModalNetwork/>
      <ModalLocation/>
      <ModalPunctuation/>
    </div>

    /*{<div className="row  border border-dark bg-success mb-4 p-3">
      <div className="col-md-3"></div>}*/
  );
};
