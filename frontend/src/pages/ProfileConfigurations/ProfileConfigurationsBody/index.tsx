import { User } from '@/api/users/user'
import { GrayCard } from '@/components/common/Card'
import { Limiter } from '@/components/common/Limiter'
import { PersonalInfos } from '@/pages/ProfileConfigurations/ProfileConfigurationsBody/PersonalInfos'

export const ProfileConfigurationsBody = ({user}:{user:User}) => {
  return (
    <div className='flex justify-center bg-black py-4'>
      <Limiter className='flex gap-4'>
          <LeftColumn/>
          <RightColumn/>
      </Limiter>
    </div>
  )
}

const LeftColumn = () => {
  return (
    <GrayCard className='divide-y w-1/3'>
      <h2 className='py-4 text-lg font-bold'>Configurações da conta</h2>
      <p className='py-4'>Informações pessoais</p>
      <p className='py-4'>Perfil</p>
      <p className='py-4'>Trocar senha</p>
    </GrayCard>
  )
}

const RightColumn = () => {
  return (
    <GrayCard className='w-2/3'>
      <h2 className='py-4 text-lg font-bold border-b '>Configurações da conta</h2>
      <PersonalInfos/>
    </GrayCard>
  )
}
