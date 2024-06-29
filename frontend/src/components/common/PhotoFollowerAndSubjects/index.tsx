import React from 'react'
import { Limiter } from '@/components/common/Limiter';

type PhotoFollowerAndSubjectsProps = {
  profilePhoto:string;
  profileName:string;
  followers:string;
  subjects:string;
}
export const PhotoFollowerAndSubjects = ({profilePhoto, profileName,  followers, subjects}:PhotoFollowerAndSubjectsProps) => {
  return (
    <div className='bg-black text-white flex justify-center -mt-8'>
      <Limiter>
      <div className='flex items-center py-4 w-full '>
        <div className="flex gap-6 w-2/3 items-center">
          <img src={profilePhoto} alt='Foto de perfil' className='w-[180px] '/>
          <span className='font-bold text-xl'>{profileName}</span>
        </div>
        <div className="flex w-1/3 gap-8 justify-center">
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
