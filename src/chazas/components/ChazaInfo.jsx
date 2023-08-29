import choza from '../../assets/images/choza.jpg'

export const ChazaInfo = () => {
  return (
    <div className='row  border border-dark bg-success mb-4 p-3'>
        <div className='col-md-3'>
            <img src={choza} alt="choza" className="card-img border border-black"/>
        </div>

        <div className='col-md-9 bg-secondary p-2 border border-black d-flex'>

          <div className='col-md-6 d-flex align-items-start flex-column'>
            <label className='mb-1'>Nombre: districhaza</label>
            <label className='mb-1'>Ubicacion: pues que le digo, en el bloque 14 :v</label>
            <label className='mb-1'>creacion: 18-02-2023</label>
            <label className='mb-2'>puntuacion: 50</label>
            <button className='btn btn-info '>Ver comentarios</button>
          </div>

          <div className='col-md-6 d-flex align-items-start flex-column'>
            <label className='mb-1'>Propietarios: andres felipe cadena cadena</label>
            <label className='mb-1'>Telefonos: 3224040389, 34745874559</label>
            <label className='mb-1'>Redes sociales: oscar, juancho</label>
          </div>
          
        </div>
    </div>
  )
}
