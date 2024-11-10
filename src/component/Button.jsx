// componnets for common use cases
import React, { Children } from 'react'

const Button = ({
    Children,
    bgColor='bg-info',
    textColor='text-primary-emphasis',
    className='',
    ...props
}) => {
  return (
    <button className={`btn btn-sm ${className}${bgColor}${textColor}`}{...props}>
        {Children}
    </button>
  )
}

export default Button
