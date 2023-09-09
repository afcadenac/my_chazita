import { memo } from "react";


export const ValueSelect = memo(({selector={},options=[], cb=()=>{}}) => {

  return (
    <select name={selector.name} value={selector.value} onChange={cb} className="col mx-2 form-select">

      {
        options.map((option)=>(<option key={option} value={option}>{option}</option>))
      }
      
    </select>
  )
})
