import choza from '../../assets/images/choza.jpg'
import { getEnvVariables } from '../../helpers';
import { useAuthStore, useChazaStore, useProductStore, useUiStore } from '../../hook';
import { ModalPhoto } from './ModalPhoto';

export const ChazaInfo = () => {

  const {currentChaza,startUpdateChazaPhoto}=useChazaStore();
  const {user}=useAuthStore();
  const {openModalPhoto,closeModalPhoto,ChangeTypePhoto,currentTypePhoto}=useUiStore();
  const {startUpdateProductPhoto}=useProductStore();

  const onPhotoChange=(photo)=>{
    const formData = new FormData();
    formData.append('photo', photo);
    
    if(currentTypePhoto==="chaza") startUpdateChazaPhoto(formData);

    if(currentTypePhoto==="product") startUpdateProductPhoto(formData);

    closeModalPhoto();
  }

  const onOpenModalPhoto=(photo)=>{
    ChangeTypePhoto("chaza");
    openModalPhoto();
  }

  return (
    <>
      <div className='row  border border-dark bg-success mb-4 p-3'>
        <div className='col-md-3'>
            <img src={getEnvVariables().VITE_PHOTO_URL+currentChaza.photo} alt="choza" className="card-img border border-black"/>
            {
              (user.chaza===currentChaza._id) && <button className='btn btn-primary' onClick={onOpenModalPhoto}>cambiar</button>
            }
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

      <ModalPhoto make={onPhotoChange}/>
    </>
  )
}
