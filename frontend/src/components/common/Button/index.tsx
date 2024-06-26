import React, { ReactNode } from 'react'

type ButtonProps = {
    children:ReactNode;
}

export const Button = ({children}:ButtonProps) => {
  return (
    <div className='bg-yellow-600 rounded-xl text-center text-black px-2 py-2 hover:bg-yellow-seu-treino transition-colors font-semibold cursor-pointer text-lg'>
       <span>{children}</span>
    </div>
  )
}
