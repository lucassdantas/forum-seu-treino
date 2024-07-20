import { User } from '@/api/users/user'
import { UserInFollowContextProps } from '@/api/users/userInFollowContext'
import { Button, OutlineButton } from '@/components/common/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const UserInFollowContextCard = ({user, className}:{user:User, className?:string}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const handleOpenMessage = () => {

  }
  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }
  return (
    <div className={'bg-neutral-950 text-white rounded-md my-4 ' + className}>
      <div className={`bg-[url("${user.userCoverImage} bg-neutral-400 w-full h-[80px] p-1")]`}> </div>
      <div className='py-8 flex flex-col items-center gap-4 w-full'>
        <img src={user.userProfileImage } alt={'Foto de perfil do' + user.userName} className='w-[120px] -mt-14 text-center relative'/>
        <span className='mb-4'>{user.userName}</span>
        <div className='flex justify-center gap-4'>
          <Button className='bg-white' onClick={() => handleOpenMessage()}>Mensagem</Button>
          {isFollowing? 
            <OutlineButton className='border-yellow-seu-treino min-w-[90px]' onClick={() => handleFollow()}>Seguir</OutlineButton>
            :<Button className='bg-yellow-seu-treino' onClick={() => handleFollow()}>Seguindo</Button>
          }
        </div>
        <Link to={`/perfil?id=${user.userId}`}>Visitar Perfil</Link>
      </div>
    </div>
  )
}
