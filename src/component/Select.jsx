import React from 'react'
import React,{useId} from 'react'
const Select = ({
    options,
    label,
    className='',
    ...props
},ref) => {
    const id=useId();
  return (
    <div>
        {label && <label htmlFor={id}></label>}
        <select {...props} id={id} ref={ref} className={`form-select ${className}`} >
            {options&&options.map((option)=>(
                <option key={option}value={option}>{option}</option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select);  //also we can do this 
