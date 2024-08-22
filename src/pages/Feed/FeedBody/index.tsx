import { Limiter } from '@/components/common/Limiter'
import { MiddleColumn } from '@/pages/Feed/FeedBody/MiddleColumn'
import { LeftColumn } from '@/pages/Feed/FeedBody/LeftColumn'
import tempAdvertisingImage from '@/assets/advertising/personal-trainer-breno-silva-1.jpg'
import { Button } from '@/components/common/Button'
import { GrayCard } from '@/components/common/Card'

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
  const advertising = [
    {
        img:tempAdvertisingImage
    },
]
  return (
    <div className='text-white flex flex-col w-full items-center md:w-1/4 gap-4'>
    {
      advertising.map((ads, i) => (
        <GrayCard key={i} className=''>
          <h3>Anúncios em breve</h3>
        </GrayCard>
      ))
    }
  </div>
  )
}
