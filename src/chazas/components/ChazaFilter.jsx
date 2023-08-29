import React from 'react'

export const ChazaFilter = () => {
  return (
    <div className='row  border border-dark bg-danger mb-4'>
        <div className="col-md-4 p-2">
            <input type="text" className="form-control" placeholder='Buscar'/>
        </div>
        <div className="col-md-7 p-2">
          <p>Aqui van los filtros </p>
          {/* <select name="" id="">
            <option value="1">uno</option>
            <option value="2">dos</option>
            <option value="3">tres</option>
          </select> */}
        </div>
        <div className="col-lg-1 p-2">
            <button className='btn btn-primary '>Filtrar</button>
        </div>
    </div>
  )
}
