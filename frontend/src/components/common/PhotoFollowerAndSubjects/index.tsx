import { useState, useEffect, useContext } from 'react';
import { currentUserContext } from '@/api/users/currentUserContext';
import { User } from '@/api/users/user';
import { Button } from '@/components/common/Button';
import { Limiter } from '@/components/common/Limiter';
import { UserImage } from '@/components/UserImage';
import { isFollowing } from '@/api/followers/isFollowing';
import { followUser } from '@/api/followers/followUser';
import { unfollowUser } from '@/api/followers/unFollowUser';

type PhotoFollowerAndSubjectsProps = {
  profileName: string;
  followers: number;
  subjects: number;
  profileOwner: User;
};

export const PhotoFollowerAndSubjects = ({ profileName, followers, subjects, profileOwner }: PhotoFollowerAndSubjectsProps) => {
  const currentUser = useContext(currentUserContext);
  const [isFollowingState, setIsFollowingState] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (profileOwner) {
        const isFollowingStatus = await isFollowing(currentUser.userId, profileOwner.userId);
        setIsFollowingState(isFollowingStatus);
      }
    };

    checkFollowingStatus();
  }, [profileOwner, currentUser.userId]);

  const handleFollowClick = async () => {
    if (profileOwner) {
      if (isFollowingState) {
        const success = await unfollowUser(currentUser.userId, profileOwner.userId);
        if (success) {
          setIsFollowingState(false);
        }
      } else {
        const success = await followUser(currentUser.userId, profileOwner.userId);
        if (success) {
          setIsFollowingState(true);
        }
      }
    }
  };

  return (
    <div className='bg-black text-white flex justify-center -mt-8 px-4'>
      <Limiter>
        <div className='flex flex-col md:flex-row items-center py-4 w-full'>
          <div className="flex flex-col md:flex-row gap-6 w-full md:w-2/3 items-center">
            <UserImage userId={profileOwner.userId} size={100} className={'md:w-[180px] md:h-[180px]'} />
            <div className="flex flex-col">
              <span className='font-bold text-xl mb-4'>{profileName}</span>
              {profileOwner && profileOwner.userId !== currentUser.userId && (
                <Button onClick={handleFollowClick}>
                  {isFollowingState === null ? 'Carregando...' : isFollowingState ? 'Deixar de Seguir' : 'Seguir'}
                </Button>
              )}
            </div>
          </div>
          <div className="flex w-full md:w-1/3 gap-8 justify-center mt-4 md:mt-0">
            <div className="flex flex-col items-center">
              <span>Seguidores</span>
              <span className='font-bold'>{followers}</span>
            </div>
            <div className="flex flex-col items-center">
              <span>Assuntos</span>
              <span className='font-bold'>{subjects}</span>
            </div>
          </div>
        </div>
      </Limiter>
    </div>
  );
};