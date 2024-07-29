import { DEFAULT_IMAGE_DIRECTORY } from '@/constants'

type UserImageProps = {
  userId:number,
  size?:number,
  photoSize?:string,
  className?:string,
}
export const UserImage = ({userId, size=50, photoSize='default', className}:UserImageProps) => {
  if(photoSize === 'default') return <img src={`${location.origin + DEFAULT_IMAGE_DIRECTORY + userId}/${userId}.jpg`} alt='Foto do usuário' className={`w-[50px]  h-[50px]  object-cover rounded-full block ${className} `  }/>
  if(photoSize === 'lg')      return <img src={`${location.origin + DEFAULT_IMAGE_DIRECTORY + userId}/${userId}.jpg`} alt='Foto do usuário' className={`w-[120px] h-[120px] object-cover rounded-full block ${className} `  }/>
                              return <img src={`${location.origin + DEFAULT_IMAGE_DIRECTORY + userId}/${userId}.jpg`} alt='Foto do usuário' className={`w-[50px]  h-[50px]  object-cover rounded-full block ${className} `  }/>
}