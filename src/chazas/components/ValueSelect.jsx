

export const ValueSelect = ({selector={},options=[], cb=()=>{}}) => {

  return (
    <select name={selector.name} value={selector.value} onChange={cb} className="col mx-2 form-select">
        {
            options.map((option)=>(<option key={option} value={option}>{option}</option>))
        }
    </select>
  )
}
