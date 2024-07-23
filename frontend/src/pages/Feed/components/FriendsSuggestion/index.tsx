import { useState } from 'react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { Popup } from '@/components/common/Popup';
import { User } from '@/api/users/user';
import { UserImage } from '@/components/UserImage';
import { Link } from 'react-router-dom';


type FriendsSuggestionProps = {
  friends: User[];
};

export const FriendsSuggestion = ({ friends }: FriendsSuggestionProps) => {
  if (friends.length === 0) return 'Nenhuma sugestão de amizade';

  const [friendsList, setFriendsList] = useState<User[]>(friends);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const firstFriends = friendsList.slice(0, 4);

  return (
    <div className='flex flex-col gap-2'>
      <ul className='divide-y'>
        {firstFriends.map((friend, i) => (
          <li className='flex gap-4 items-center justify-between py-4' key={i}>
            <div className='flex items-center gap-4'>
              <UserImage userId={friend.userId}  />
              <Link to={'/perfil?id='+friend.userId}>{friend.userName}</Link>
            </div>
            <div className='cursor-pointer'>
              <IoPersonAddOutline />
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
                <img src={friend.userProfileImage} alt='Foto do usuário' className='w-[40px]' />
                <span>{friend.userName}</span>
              </div>
              <div className='cursor-pointer'>
                <IoPersonAddOutline />
              </div>
            </li>
          ))}
        </ul>
      </Popup>
    </div>
  );
};
