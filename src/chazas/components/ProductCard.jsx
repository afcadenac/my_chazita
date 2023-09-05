import producto from '../../assets/images/producto.jpg'
import { getEnvVariables } from '../../helpers';
import { useAuthStore, useChazaStore, useProductStore, useUiStore } from '../../hook'
import '../../styles.css';
import { ModalPhoto } from './ModalPhoto';

export const ProductCard = ({list={}}) => {

  const {currentChaza}=useChazaStore();
  const {user}=useAuthStore();
  const {ChangeValue,openModal,ChangeValueSelector,openModalPhoto,closeModalPhoto,ChangeTypePhoto}=useUiStore();
  const {startDeleteProduct}=useProductStore();

  const onChangeValue=()=>{
    if(list.chaza===user.chaza){
      ChangeValueSelector({
        type:["bebida","comida","servicio","otro"]
      });
      ChangeValue(list)
    }
  }

  const onOpenModal=()=>{
    if(list.chaza===user.chaza){
      openModal()
    }
  }

  const onOpenModalPhoto=(photo)=>{
    ChangeTypePhoto("product");
    openModalPhoto();
  }

  return (
    <div className="col-md-6 bg-success d-flex border border-black p-2 espace-pointer" onClick={onChangeValue} onDoubleClick={onOpenModal}>
      <div className="col-md-8 d-flex align-items-center flex-column">
        <h4>{list.name}</h4>
        <div className='row mt-2 mb-2'>
          <label className='col'>Precio: {list.price}</label>
          <label className='col'>Stock: {list.stock}</label>
          <label className='col'>Tipo: {list.type}</label>
        </div>
        <label>Descripcion: {list.description}</label>
      </div>

      <div className="col-md-4">

        {
          (user.chaza===currentChaza._id)
          ?(<button className='btn btn-danger mb-2' onClick={()=>startDeleteProduct(list)}>eliminar</button>)
          :""
        }

        <img src={getEnvVariables().VITE_PHOTO_URL+list.photo || producto} alt="product" className="card-img border border-black"/>
        {
          (user.chaza===list.chaza) && <button className='btn btn-primary' onClick={onOpenModalPhoto}>cambiar foto</button>
        }  
      </div>
    </div>
  )
}
