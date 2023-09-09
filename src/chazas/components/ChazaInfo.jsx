import choza from '../../assets/images/choza.jpg'
import { getEnvVariables } from '../../helpers';
import { useAuthStore, useChazaStore, useProductStore, useUiStore } from '../../hook';
import { ModalPhoto } from './ModalPhoto';


import "../../styles.css";

export const ChazaInfo = () => {
  
  const {currentChaza}=useChazaStore();
  const {user}=useAuthStore();
  const {openModalPhoto,ChangeTypePhoto}=useUiStore();

  const onOpenModalPhoto=()=>{
    ChangeTypePhoto("chaza");
    openModalPhoto();
  }

  return (
    
      <div className="card bg-dark text-white">
        <img src={getEnvVariables().VITE_PHOTO_URL+currentChaza.photo} className="card-img info" alt="..." />
        <div className="card-img-overlay overlay-text d-block">
          <h5 className="card-title d-flex justify-content-center">Nombre: {currentChaza.name}</h5>
          <p className="card-text d-flex justify-content-center gap-5">
            <label className="mb-1">Ubicacion: {currentChaza.location}</label>
            <label className="mb-1">creacion: {currentChaza.date}</label>
            <label className="mb-2">puntuacion: {currentChaza.punctuation}</label>
          </p>
          

          <p className="card-text d-flex justify-content-center gap-5">
            <label className="mb-1">
              Propietarios: andres felipe cadena cadena
            </label>
            <label className="mb-1">Telefonos: 3224040389, 34745874559</label>
            <label className="mb-1">Redes sociales: oscar, juancho</label>
          </p>
          <button className="btn btn-info ">Ver comentarios</button>
          {
            (user.chaza===currentChaza._id) && <button className='btn btn-primary mx-2' onClick={onOpenModalPhoto}>cambiar</button>
          }
        </div>

      </div>


  /*{<div className="row  border border-dark bg-success mb-4 p-3">
      <div className="col-md-3"></div>}*/
  );
};
