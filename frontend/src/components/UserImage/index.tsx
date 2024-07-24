import { DEFAULT_IMAGE_DIRECTORY } from '@/constants'

type UserImageProps = {
  userId:number,
  size?:number,
  className?:string,
}
export const UserImage = ({userId, size=50, className}:UserImageProps) => {
  const sizeToClass = ' w-['+String(size)+'px] h-['+String(size)+'px]';
  return <img src={`${location.origin + DEFAULT_IMAGE_DIRECTORY + userId}/${userId}.jpg`} alt='Foto do usuário' className={sizeToClass+` object-cover rounded-full block ${className}`  }/>
}