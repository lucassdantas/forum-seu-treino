import { useState, useEffect, useContext } from 'react';
import { currentUserContext } from '@/api/users/currentUserContext';
import { User } from '@/api/users/user';
import { Button } from '@/components/common/Button';
import { Limiter } from '@/components/common/Limiter';
import { UserImage } from '@/components/UserImage';
import { isFollowing } from '@/api/followers/isFollowing';
import { followUser } from '@/api/followers/followUser';
import { unfollowUser } from '@/api/followers/unFollowUser';
import { getFollowersCount } from '@/api/followers/getFollowersCount';
import { getFollowingCount } from '@/api/followers/getFollowingCount';

type PhotoFollowerAndSubjectsProps = {
  profileName: string;
  profileOwner: User;
};

export const PhotoFollowerAndSubjects = ({ profileName, profileOwner }: PhotoFollowerAndSubjectsProps) => {
  const currentUser = useContext(currentUserContext);
  const [isFollowingState, setIsFollowingState] = useState<boolean | null>(null);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      if (profileOwner) {
        const followers = await getFollowersCount(profileOwner.userId);
        const following = await getFollowingCount(profileOwner.userId);
        setFollowersCount(followers);
        setFollowingCount(following);
      }
    };

    fetchCounts();
  }, [profileOwner]);

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
        <div className='flex flex-col md:flex-row items-center py-4 w-full sm:text-left text-center'>
          <div className="flex flex-col md:flex-row gap-6 w-full md:w-2/3 items-center">
            <UserImage userId={profileOwner.userId} photoSize={'lg'} className={''} />
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
              <span className='font-bold'>{followersCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <span>Seguindo</span>
              <span className='font-bold'>{followingCount}</span>
            </div>
          </div>
        </div>
      </Limiter>
    </div>
  );
};
