import { useState, useEffect } from 'react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { Popup } from '@/components/common/Popup';
import { User } from '@/api/users/user';
import { UserImage } from '@/components/UserImage';
import { Link } from 'react-router-dom';
import { checkFollowStatus } from '@/api/followers/checkFollowStatus';
import { followUser } from '@/api/followers/followUser';

type FriendsSuggestionProps = {
  friends: User[];
  currentUserId: number; // Adicione o ID do usuário atual como uma prop
};

type FollowStatus = {
  [key: number]: boolean;
};

export const FriendsSuggestion = ({ friends, currentUserId }: FriendsSuggestionProps) => {
  const [friendsList, setFriendsList] = useState<User[]>(friends);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [followStatus, setFollowStatus] = useState<FollowStatus>({});

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const friendIds = friends.map(friend => friend.userId);
      const status = await checkFollowStatus(currentUserId, friendIds);
      setFollowStatus(status);
    };

    fetchFollowStatus();
  }, [friends, currentUserId]);

  const handleFollowClick = async (friendId: number) => {
    const success = await followUser(currentUserId, friendId);
    if (success) {
      setFollowStatus(prevStatus => ({ ...prevStatus, [friendId]: true }));
    }
  };

  const firstFriends = friendsList.slice(0, 4);

  return (
    <div className='flex flex-col gap-2'>
      <ul className='divide-y'>
        {firstFriends.map((friend, i) => (
          <li className='flex gap-4 items-center justify-between py-4' key={i}>
            <div className='flex items-center gap-4'>
              <UserImage userId={friend.userId} />
              <Link to={'/perfil?id=' + friend.userId}>{friend.userName}</Link>
            </div>
            <div className='cursor-pointer' onClick={() => handleFollowClick(friend.userId)}>
              {followStatus[friend.userId] ? 'Seguindo' : <IoPersonAddOutline />}
            </div>
          </li>
        ))}
      </ul>

      {friendsList.length > 4 && (
        <span className='mb-4 cursor-pointer' onClick={() => setIsPopupOpen(true)}>
          Ver todas as sugestões
        </span>
      )}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <ul className='divide-y'>
          {friendsList.map((friend, i) => (
            <li className='flex gap-4 items-center justify-between py-4' key={i}>
              <div className='flex items-center gap-4'>
                <UserImage userId={friend.userId} />
                <span>{friend.userName}</span>
              </div>
              <div className='cursor-pointer' onClick={() => handleFollowClick(friend.userId)}>
                {followStatus[friend.userId] ? 'Seguindo' : <IoPersonAddOutline />}
              </div>
            </li>
          ))}
        </ul>
      </Popup>
    </div>
  );
};
