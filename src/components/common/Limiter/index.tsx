import { ReactNode } from 'react'

type LimiterProps = {
    children: ReactNode;
    className?:string;
}

export const Limiter = ({children, className}:LimiterProps) => {
  return (
    <div className={'max-w-[1280px] w-full ' + className}>
        {children}
    </div>
  )
}
