import { memo } from 'react'
import { useForm } from '../../hook/useForm'
import { convertToVector } from '../../helpers/convertToVector';
import { ValueSelect } from './ValueSelect';

export const ChazaFilter = memo(({filter={},config={},cb=()=>{}}) => {

  const {onInputChange,formState}=useForm({...filter,name:""});

  const onFilter=()=>{
    console.log(formState);
  }
  
  return (
    <div className='row  border border-dark bg-danger mb-4'>
        <div className="col-md-4 p-2">
            <input type="text" className="form-control" placeholder="Nombre" onChange={onInputChange} name='name' value={formState.name}/>
        </div>
        <div className="col-md-7 p-2 row">

          {
            convertToVector(formState).map((selector)=>{
              if(selector.name==="name") return "";
              return (
              <ValueSelect key={selector.name} selector={selector} options={config[selector.name]} cb={onInputChange}></ValueSelect>
              )
            })
          }
          {/* <select name="" id="">
            <option value="1">uno</option>
            <option value="2">dos</option>
            <option value="3">tres</option>
          </select> */}
        </div>
        <div className="col-lg-1 p-2">
            <button className='btn btn-primary' onClick={()=>cb(formState)}>Filtrar</button>
        </div>
    </div>
  )
})
