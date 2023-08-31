import { useAuthStore, useChazaStore, useProductStore, useUiStore } from '../../hook';
import { ModalForm, ProductCard } from './'

export const ProductList = () => {

  const {user}=useAuthStore();
  const {currentChaza}=useChazaStore();
  const {ChangeValue,currentValue,openModal}=useUiStore();

  const {products,startNewProduct,startUpdateProduct}=useProductStore();

  const onNewProduct=()=>{
    ChangeValue({
      name:"",
      price:"",
      stock:"",
      type:"",
      description:"",
      photo:""
    });
    openModal();
  }

  const onSubmitProduct=(product)=>{
    if(product._id){
      startUpdateProduct(product);
      return;
    }

    startNewProduct(product);
  }

  return (
    <div className='row  border border-dark bg-primary mb-4 p-3'>
        {
          products.map((product)=><ProductCard key={product._id} list={product}/>)
        }

        {
          (user.chaza===currentChaza._id && currentChaza._id)
          ?(<button className='btn btn-success mt-2' onClick={onNewProduct}>Nuevo</button>)
          :""
        }

        <ModalForm make={onSubmitProduct}/>
    </div>
  )
}
