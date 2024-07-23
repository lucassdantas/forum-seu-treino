import { Limiter } from '@/components/common/Limiter'
import { advertising } from '@/api/advertising'
import { MiddleColumn } from '@/pages/Feed/FeedBody/MiddleColumn'
import { LeftColumn } from '@/pages/Feed/FeedBody/LeftColumn'

export const FeedBody = () => {
  return (
    <div className='bg-black w-full flex justify-center pb-4 xl:px-0 px-4'>
      <Limiter>
        <div className='flex flex-col md:flex-row gap-4 md:gap-12 pt-4'>
          <LeftColumn />
          <MiddleColumn />
          <RightColumn />
        </div>
      </Limiter>
    </div>
  )
}


const RightColumn = () => {
  return (
    <div className='text-white flex flex-col w-full md:w-1/4 gap-4'>
      {
        advertising.map((ads, i) => (
          <div key={i} className='border rounded-md'>
            <img src={ads.img} alt='Propaganda' />
          </div>
        ))
      }
    </div>
  )
}
