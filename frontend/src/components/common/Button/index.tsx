import React, { ReactNode } from 'react'

type ButtonProps = {
    children:ReactNode;
}

export const Button = ({children}:ButtonProps) => {
  return (
    <div className='bg-orange-seu-treino rounded-lg text-center text-black px-2 py-2 max-w-[160px] hover:bg-yellow-seu-treino transition-colors font-semibold cursor-pointer text-lg'>
       <span>{children}</span>
    </div>
  )
}

export const OutlineButton = ({children}:ButtonProps) => {
  return (
    <div className='bg-transparent border-2 rounded-lg text-center px-2 py-2 max-w-[160px] hover:bg-yellow-seu-treino transition-colors font-semibold cursor-pointer '>
       <span>{children}</span>
    </div>
  )
}
