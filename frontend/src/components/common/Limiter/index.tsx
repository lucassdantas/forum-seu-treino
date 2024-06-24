import React, { ReactNode } from 'react'

type LimiterProps = {
    children: ReactNode;
}

export const Limiter = ({children}:LimiterProps) => {
  return (
    <div className='max-w-[1280px] w-full'>
        {children}
    </div>
  )
}
