import { UserInFollowContextProps } from '@/api/users/userInFollowContext'
import { Button, OutlineButton } from '@/components/common/Button'
import { Link } from 'react-router-dom'

export const UserInFollowContextCard = ({user, className}:{user:UserInFollowContextProps, className?:string}) => {
  return (
    <div className={'bg-neutral-950 text-white rounded-md ' + className}>
      <div className={`bg-[url("${user.coverPhoto} bg-neutral-400 w-full h-[80px] p-1")]`}> </div>
      <div className='py-8 flex flex-col items-center gap-4 w-full'>
        <img src={user.userImage } alt={'Foto de perfil do' + user.userName} className='w-[120px] -mt-14 text-center relative'/>
        <span className='mb-4'>{user.userName}</span>
        <div className='flex justify-center gap-4'>
          <Button className='bg-yellow-seu-treino'>Mensagem</Button>
          <OutlineButton className='border-yellow-seu-treino min-w-[90px]'>Seguir</OutlineButton>
        </div>
        <Link to={`user.userId`}>Visitar Perfil</Link>
      </div>
    </div>
  )
}
