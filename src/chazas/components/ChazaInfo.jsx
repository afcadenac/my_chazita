import choza from '../../assets/images/choza.jpg'
import { useChazaStore } from '../../hook';

export const ChazaInfo = () => {

  const {currentChaza}=useChazaStore();

  return (
    <div className='row  border border-dark bg-success mb-4 p-3'>
        <div className='col-md-3'>
            <img src={"http://localhost:4000/"+currentChaza.photo} alt="choza" className="card-img border border-black"/>
        </div>

        <div className='col-md-9 bg-secondary p-2 border border-black d-flex'>

          <div className='col m-2 d-flex align-items-start flex-column'>
            <label className='mb-1'>Nombre: {currentChaza.name}</label>
            <label className='mb-1'>Ubicacion: {currentChaza.location}</label>
            <label className='mb-1'>creacion: {currentChaza.date}</label>
            <label className='mb-2'>puntuacion: {currentChaza.punctuation}</label>
            <button className='btn btn-info '>Ver comentarios</button>
          </div>

          <div className='col m-2 d-flex align-items-start flex-column'>
            <label className='mb-1'>Propietarios: andres felipe cadena cadena</label>
            <label className='mb-1'>Telefonos: 3224040389, 34745874559</label>
            <label className='mb-1'>Redes sociales: oscar, juancho</label>
          </div>
          
        </div>
    </div>
  )
}
