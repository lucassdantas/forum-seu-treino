import { Limiter } from '@/components/common/Limiter'
import { advertising } from '@/api/advertising'
import { User } from '@/types/user'
import { LeftColumn } from '@/pages/Profile/ProfileBody/LeftColumn'
import { MiddleColumn } from '@/pages/Profile/ProfileBody/MiddleColumn'

export const ProfileBody = ({user}:{user:User}) => {
  return (
    <div className='bg-black w-full flex justify-center pb-4 xl:px-0 px-4'>
      <Limiter>
        <div className='flex flex-col md:flex-row gap-4 md:gap-12 pt-4'>
          <LeftColumn />
          <MiddleColumn user={user} />
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
