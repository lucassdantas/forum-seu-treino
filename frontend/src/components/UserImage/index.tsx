import { DEFAULT_IMAGE_DIRECTORY } from '@/constants'

type UserImageProps = {
  userId:number,
  size?:number,
  className?:string,
}
export const UserImage = ({userId, size=50, className}:UserImageProps) => {
  return <img src={`${location.origin + DEFAULT_IMAGE_DIRECTORY + userId}/${userId}.jpg`} alt='Foto do usuário' className={` w-[${size}px] h-[${size}px] object-cover rounded-full block ${className}`  }/>
}