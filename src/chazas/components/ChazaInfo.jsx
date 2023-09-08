import choza from "../../assets/images/choza.jpg";
import { useChazaStore } from "../../hook";

import "../../styles.css";

export const ChazaInfo = () => {
  const { currentChaza } = useChazaStore();

  return (
    
      <div className="card bg-dark text-white">
        <img src={choza} className="card-img info" alt="..." />
        <div className="card-img-overlay overlay-text d-block">
          <h5 className="card-title d-flex">Nombre: {currentChaza.name}</h5>
          <p className="card-text d-flex justify-content-center gap-5">
            <label className="mb-1">Ubicacion: {currentChaza.location}</label>
            <label className="mb-1">creacion: {currentChaza.date}</label>
            <label className="mb-2">puntuacion: {currentChaza.punctuation}</label>
          </p>
          

          <div className="col m-2 d-flex align-items-start flex-column">
          <label className="mb-1">
            Propietarios: andres felipe cadena cadena
          </label>
          <label className="mb-1">Telefonos: 3224040389, 34745874559</label>
          <label className="mb-1">Redes sociales: oscar, juancho</label>
        </div>
        <button className="btn btn-info ">Ver comentarios</button>
        </div>

        
      </div>


  /*{<div className="row  border border-dark bg-success mb-4 p-3">
      <div className="col-md-3"></div>}*/
  );
};
