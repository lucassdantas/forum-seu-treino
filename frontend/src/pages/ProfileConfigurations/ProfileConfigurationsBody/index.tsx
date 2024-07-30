import { useState } from 'react';
import { User } from '@/types/user';
import { GrayCard } from '@/components/common/Card';
import { Limiter } from '@/components/common/Limiter';
import { PersonalInfos } from '@/pages/ProfileConfigurations/ProfileConfigurationsBody/PersonalInfos';

export const ProfileConfigurationsBody = ({ user }: { user: User }) => {

  return (
    <div className='flex justify-center bg-black py-4'>
      <Limiter className='flex gap-4'>
        <LeftColumn  />
        <RightColumn>
          <PersonalInfos />
        </RightColumn>
      </Limiter>
    </div>
  );
};

const LeftColumn = () => {
  return (
    <GrayCard className='divide-y w-1/3'>
      <h2 className='py-4 text-lg font-bold'>Configurações da conta</h2>
      <p className='py-4 cursor-pointer' >Informações pessoais</p>
    </GrayCard>
  );
};

const RightColumn = ({ children }: { children: React.ReactNode }) => {
  return (
    <GrayCard className='w-2/3'>
      {children}
    </GrayCard>
  );
};
