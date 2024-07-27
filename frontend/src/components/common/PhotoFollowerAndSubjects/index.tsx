import { currentUserContext } from '@/api/users/currentUserContext';
import { Limiter } from '@/components/common/Limiter';
import { UserImage } from '@/components/UserImage';
import { useContext } from 'react';

type PhotoFollowerAndSubjectsProps = {
  profileName: string;
  followers: number;
  subjects: number;
}

export const PhotoFollowerAndSubjects = ({  profileName, followers, subjects }: PhotoFollowerAndSubjectsProps) => {
  const currentUser = useContext(currentUserContext)

  return (
    <div className='bg-black text-white flex justify-center -mt-8 px-4'>
      <Limiter>
        <div className='flex flex-col md:flex-row items-center py-4 w-full'>
          <div className="flex flex-col md:flex-row gap-6 w-full md:w-2/3 items-center">
            <UserImage userId={currentUser.userId} size={100} className={'md:w-[180px] md:h-[180px]'}/>
            <span className='font-bold text-xl'>{profileName}</span>
          </div>
          <div className="flex w-full md:w-1/3 gap-8 justify-center mt-4 md:mt-0">
            <div className="flex flex-col items-center">
              <span>Seguidores</span>
              <span className='font-bold'>{followers}</span>
            </div>
            <div className="flex flex-col items-center">
              <span>Assuntos</span>
              <span className='font-bold'>{subjects}</span>
            </div>
          </div>
        </div>
      </Limiter>
    </div>
  )
}
