import { useState, useEffect } from 'react';
import { UserBasic } from '@/types/userBasic';
import { Button } from '@/components/common/Button';
import { Limiter } from '@/components/common/Limiter';
import { UserImage } from '@/components/UserImage';
import { isFollowing } from '@/api/followers/isFollowing';
import { followUser } from '@/api/followers/followUser';
import { unfollowUser } from '@/api/followers/unFollowUser';
import { getFollowersCount } from '@/api/followers/getFollowersCount';
import { getFollowingCount } from '@/api/followers/getFollowingCount';
import { useUser } from '@/context/currentUserContext';
import { getFollowersList } from '@/api/followers/getFollowersList';
import { getFollowingList } from '@/api/followers/getFollowingList';
import { Popup } from '@/components/common/Popup';
import Login from '@/pages/Login';
import { Link } from 'react-router-dom';

type PhotoFollowerAndSubjectsProps = {
    profileName: string;
    profileOwner: UserBasic;
    userRole:string | null;
};

export const PhotoFollowerAndSubjects = ({ profileName, profileOwner, userRole }: PhotoFollowerAndSubjectsProps) => {
    const { currentUser } = useUser();
    if (!currentUser) return <Login />;

    const [isFollowingState, setIsFollowingState] = useState<boolean | null>(null);
    const [followersCount, setFollowersCount] = useState<number>(0);
    const [followingCount, setFollowingCount] = useState<number>(0);
    const [followersList, setFollowersList] = useState<UserBasic[]>([]);
    const [followingList, setFollowingList] = useState<UserBasic[]>([]);
    const [isFollowersPopupOpen, setIsFollowersPopupOpen] = useState<boolean>(false);
    const [isFollowingPopupOpen, setIsFollowingPopupOpen] = useState<boolean>(false);

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

    const handleFollowersClick = async () => {
        const followers = await getFollowersList(profileOwner.userId);
        setFollowersList(followers);
        setIsFollowersPopupOpen(true);
    };

    const handleFollowingClick = async () => {
        const following = await getFollowingList(profileOwner.userId);
        setFollowingList(following);
        setIsFollowingPopupOpen(true);
    };

    const handleUnfollowClick = async (friendId: number) => {
        const success = await unfollowUser(currentUser.userId, friendId);
        if (success) {
            setFollowersList((prev) => prev.filter((user) => user.userId !== friendId));
            setFollowingList((prev) => prev.filter((user) => user.userId !== friendId));
        }
    };

    const handleRemoveFollowerClick = async (followerId: number) => {
        const success = await unfollowUser(followerId, currentUser.userId);
        if (success) {
            setFollowersList((prev) => prev.filter((user) => user.userId !== followerId));
        }
    };
    return (
        <div className='bg-black text-white flex justify-center -mt-4 px-4'>
            <Limiter>
                <div className='flex flex-col md:flex-row items-center py-4 w-full sm:text-left text-center'>
                    <div className="flex flex-col md:flex-row gap-6 w-full md:w-2/3 items-center">
                        <UserImage userId={profileOwner.userId} userHasImage={profileOwner.userHasImage} photoSize={'lg'} className={'-mt-4'} />
                        <div className="flex flex-col py-2">
                            <span className='font-bold text-xl mb-4'>{profileName} - <strong>{userRole}</strong></span>
                            {profileOwner && profileOwner.userId != currentUser.userId && (
                                <Button onClick={handleFollowClick}>
                                    {isFollowingState === null ? 'Carregando...' : isFollowingState ? 'Deixar de Seguir' : 'Seguir'}
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full md:w-1/3 gap-8 justify-center mt-4 md:mt-0">
                        <div className="flex flex-col items-center cursor-pointer" onClick={handleFollowersClick}>
                            <span>Seguidores</span>
                            <span className='font-bold'>{followersCount}</span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer" onClick={handleFollowingClick}>
                            <span>Seguindo</span>
                            <span className='font-bold'>{followingCount}</span>
                        </div>
                    </div>
                </div>
            </Limiter>
            <Popup isOpen={isFollowersPopupOpen} onClose={() => setIsFollowersPopupOpen(false)}>
                <div>
                    <h3 className="text-xl font-bold mb-4">Seguidores</h3>
                    {followersList.length > 0 ? (
                        followersList.map((follower) => (
                            <div key={follower.userId} className="mb-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <UserImage userId={follower.userId} userHasImage={follower.userHasImage} photoSize="sm" />
                                    <Link to={`/perfil?id=${follower.userId}`} className="ml-2">
                                        {follower.userName}
                                    </Link>
                                </div>
                                <Button onClick={() => handleRemoveFollowerClick(follower.userId)}>Remover</Button>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum seguidor encontrado.</p>
                    )}
                </div>
            </Popup>
            <Popup isOpen={isFollowingPopupOpen} onClose={() => setIsFollowingPopupOpen(false)}>
                <div>
                    <h3 className="text-xl font-bold mb-4">Seguindo</h3>
                    {followingList.length > 0 ? (
                        followingList.map((followed) => (
                            <div key={followed.userId} className="mb-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <UserImage userId={followed.userId} userHasImage={followed.userHasImage} photoSize="sm" />
                                    <Link to={`/perfil?id=${followed.userId}`} className="ml-2">
                                        {followed.userName}
                                    </Link>
                                </div>
                                <Button onClick={() => handleUnfollowClick(followed.userId)}>Deixar de Seguir</Button>
                            </div>
                        ))
                    ) : (
                        <p>Não está seguindo ninguém.</p>
                    )}
                </div>
            </Popup>
        </div>
    );
};
