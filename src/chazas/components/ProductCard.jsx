import producto from '../../assets/images/producto.jpg'

export const ProductCard = ({list={}}) => {
  return (
    <div className="col-md-6 bg-success d-flex border border-black p-2 ">
        <div className="col-md-8 d-flex align-items-center flex-column">
            <h4>{list.name}</h4>
            <div className='d-flex align-items-center'>
                <label className='col-sm-4'>Precio: {list.price}</label>
                <label className='col-sm-4'>Stock: {list.stock}</label>
                <label className='col-sm-4'>Tipo: {list.type}</label>
            </div>
            <label>Descripcion: {list.desc}</label>
        </div>

        <div className="col-md-4">
            <img src={producto} alt="product" className="card-img border border-black"/>
        </div>
    </div>
  )
}
