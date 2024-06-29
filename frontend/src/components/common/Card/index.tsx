import React, { ReactNode } from 'react'

type CardProps = {
    children:ReactNode
}
export const GrayCard = ({children}:CardProps) => {
  return (
    <div className='bg-gray-700 text-white p-2'>
        {children}
    </div>
  )
}
