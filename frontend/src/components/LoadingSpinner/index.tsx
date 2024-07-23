import { Oval } from 'react-loader-spinner'

export const LoadingSpinner = () => {
  return (
    <div className='text-center flex justify-center w-full'>
      <Oval color='yellow' width='50' secondaryColor="yellow"/>
    </div>
  )
}
