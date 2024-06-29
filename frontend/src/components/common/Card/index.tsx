import React, { ReactNode } from 'react'

type CardProps = {
    children:ReactNode
}
export const GrayCard = ({children}:CardProps) => {
  return (
    <div className='bg-neutral-800 text-white p-4 rounded-md'>
        {children}
    </div>
  )
}
