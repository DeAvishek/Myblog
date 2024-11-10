//using forwardREF Hook in input field
import React from 'react'
import {useId} from 'react'
const Input=React.forwardRef(function Input({
    label,
    type='text',
    className='',
    ...props
},ref)
{
    const id=useId();
    return (
        <div>
            {label && <label htmlFor={id} >{label}</label>}
            <input type={type} className={`text-black ${className}`}{...props} ref={ref} id={id}/>
        </div>
    )
})

export default Input
