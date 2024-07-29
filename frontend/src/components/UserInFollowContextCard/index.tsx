import { useState, useEffect, useContext } from 'react';
import { User } from '@/api/users/user';
import { followUser } from '@/api/followers/followUser';
import { unfollowUser } from '@/api/followers/unFollowUser';
import { currentUserContext } from '@/api/users/currentUserContext';
import { Button, OutlineButton } from '@/components/common/Button';
import { UserImage } from '@/components/UserImage';
import { Link } from 'react-router-dom';
import { checkSingleFollowStatus } from '@/api/followers/checkSingleFollowStatus';

type UserInFollowContextCardProps = {
  user: User;
  className?: string;
};

export const UserInFollowContextCard = ({ user, className }: UserInFollowContextCardProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const currentUser = useContext(currentUserContext);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const status = await checkSingleFollowStatus(currentUser.userId, user.userId);
      setIsFollowing(status);
    };

    fetchFollowStatus();
  }, [currentUser.userId, user.userId]);

  const handleFollow = async () => {
    if (isFollowing) {
      const success = await unfollowUser(currentUser.userId, user.userId);
      if (success) {
        setIsFollowing(false);
      }
    } else {
      const success = await followUser(currentUser.userId, user.userId);
      if (success) {
        setIsFollowing(true);
      }
    }
  };

  const handleOpenMessage = () => {
    // Implementar lógica para abrir mensagem
  };

  return (
    <div className={'bg-neutral-950 text-white rounded-md my-4 ' + className}>
      <div className={`bg-[url("${user.userCoverImage}")] bg-neutral-400 w-full h-[80px] p-1`}> </div>
      <div className='py-8 flex flex-col items-center gap-4 w-full'>
        <UserImage userId={user.userId} size={120} className='-mt-14 text-center relative' />
        <span className='mb-4'>{user.userName}</span>
        <div className='flex justify-center gap-4'>
          <Button className='bg-white' onClick={handleOpenMessage}>Mensagem</Button>
          {isFollowing ? 
            <OutlineButton className='border-yellow-seu-treino min-w-[90px]' onClick={handleFollow}>Deixar de seguir</OutlineButton>
            : <Button className='bg-yellow-seu-treino' onClick={handleFollow}>Seguir</Button>
          }
        </div>
        <Link to={`/perfil?id=${user.userId}`}>Visitar Perfil</Link>
      </div>
    </div>
  );
};
