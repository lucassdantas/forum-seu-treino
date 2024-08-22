import { DEFAULT_IMAGE_DIRECTORY } from '@/constants'

type UserImageProps = {
  userId:number,
  photoSize?:string,
  className?:string,
  userHasImage:number | boolean | string
}
export const UserImage = ({userId, photoSize='default', userHasImage, className=''}:UserImageProps) => {
  const imageUrl = userHasImage? `${location.origin + DEFAULT_IMAGE_DIRECTORY + userId}/${userId}.jpg`: `${location.origin + DEFAULT_IMAGE_DIRECTORY}default/default.jpg`
  if(photoSize === 'lg')      return <img src={`${imageUrl}`} alt='Foto do usuário' className={`max-w-[120px] max-h-[120px] min-h-[120px] min-w-[120px] object-cover rounded-full block ${className} `  }/>
                              return <img src={`${imageUrl}`} alt='Foto do usuário' className={`max-w-[50px]  max-h-[50px]  min-h-[50px] min-w-[50px]   object-cover rounded-full block ${className} `  }/>
}