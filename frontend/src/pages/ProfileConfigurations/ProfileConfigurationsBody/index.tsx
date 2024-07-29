import { useState } from 'react';
import { User } from '@/api/users/user';
import { GrayCard } from '@/components/common/Card';
import { Limiter } from '@/components/common/Limiter';
import { PersonalInfos } from '@/pages/ProfileConfigurations/ProfileConfigurationsBody/PersonalInfos';
import { ProfileSettings } from '@/pages/ProfileConfigurations/ProfileConfigurationsBody/ProfileSettings';
import { ChangePassword } from '@/pages/ProfileConfigurations/ProfileConfigurationsBody/ChangePassword';

export const ProfileConfigurationsBody = ({ user }: { user: User }) => {
  const [activeSection, setActiveSection] = useState<string>('personalInfos');

  const renderContent = () => {
    switch (activeSection) {
      case 'personalInfos':
        return <PersonalInfos />;
      case 'profileSettings':
        return <ProfileSettings />;
      case 'changePassword':
        return <ChangePassword />;
      default:
        return <PersonalInfos />;
    }
  };

  return (
    <div className='flex justify-center bg-black py-4'>
      <Limiter className='flex gap-4'>
        <LeftColumn setActiveSection={setActiveSection} />
        <RightColumn>
          {renderContent()}
        </RightColumn>
      </Limiter>
    </div>
  );
};

const LeftColumn = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  return (
    <GrayCard className='divide-y w-1/3'>
      <h2 className='py-4 text-lg font-bold'>Configurações da conta</h2>
      <p className='py-4 cursor-pointer' onClick={() => setActiveSection('personalInfos')}>Informações pessoais</p>
      <p className='py-4 cursor-pointer' onClick={() => setActiveSection('profileSettings')}>Perfil</p>
      <p className='py-4 cursor-pointer' onClick={() => setActiveSection('changePassword')}>Trocar senha</p>
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
