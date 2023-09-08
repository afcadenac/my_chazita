import React from 'react'

import "../../styles.css";

export const ChazaFilter = () => {
  return (
    <div className='row  border border-dark bgfilter m-4'>
        <div className="col-md-4 p-2">
            <input type="text" className="form-control" placeholder='Buscar'/>
        </div>
        <div className="col-md-7 p-2 d-flex justify-content-center align-items-center">
          <label>Aqui van los filtros </label>
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
