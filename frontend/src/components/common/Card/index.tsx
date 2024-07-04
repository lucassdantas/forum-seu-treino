import React, { ReactNode } from 'react'

type CardProps = {
    children:ReactNode;
    className?:string;
}
export const GrayCard = ({children, className}:CardProps) => {
  return (
    <div className={'bg-neutral-800 text-white p-4 rounded-md ' + className}>
        {children}
    </div>
  )
}
