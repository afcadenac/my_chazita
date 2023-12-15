import { memo } from 'react'
import { useForm } from '../../hook/useForm'
import { convertToVector } from '../../helpers/convertToVector';
import { ValueSelect } from './ValueSelect';
import "../../styles.css";
import { useAuthStore } from '../../hook';

export const ChazaFilter = memo(({filter={},config={},cb=()=>{}}) => {

  const {onInputChange,formState}=useForm({...filter,name:""});
  const {status}=useAuthStore();

  const onFilter=()=>{
    console.log(formState);
  }
  
  return (
    <div className='row  border border-dark bgfilter mt-4 mb-4 ms-0 me-0'>
        <div className="col-lg-4 p-2">
            <input type="text" className="form-control" placeholder="Nombre" onChange={onInputChange} name='name' value={formState.name}/>
        </div>
        <div className="col-lg-7 p-1 mt-1 ">
          <div className='row mx-0'>
            {
              convertToVector(formState).map((selector)=>{
                if(selector.name==="name") return "";
                if(selector.name==="myAnnouncements" && status!=="authenticated") return "";
                return (
                  <div key={selector.name}  className=" px-1 col-md">
                    <ValueSelect selector={selector} options={config[selector.name]} cb={onInputChange}></ValueSelect>
                  </div>
                
                )
              })
            }
          </div>
          
        </div>
        <div className="col-lg-1 p-2">
            <button className='btn btn-primary' onClick={()=>cb(formState)}>Filtrar</button>
        </div>
    </div>
  )
})
