import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { getUserById } from '@/api/users/getUserById';
import { User } from '@/api/users/user';
import { Banner } from '@/components/common/Banner';
import { PhotoFollowerAndSubjects } from '@/components/common/PhotoFollowerAndSubjects';
import { Oval } from 'react-loader-spinner';
import { ProfileBody } from '@/pages/Profile/ProfileBody';

type SetAuthType = React.Dispatch<React.SetStateAction<boolean>>;

interface ProfileProps {
  setAuth: SetAuthType;
}

export const Profile = ({ setAuth }: ProfileProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = Number(queryParams.get('id')) || 0;
  const [profileUser, setProfileUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost/backend/checkSession.php', { withCredentials: true });
        if (!response.data.loggedIn) {
          setAuth(false);
        }
      } catch (error) {
        console.error('There was an error checking the session!', error);
      }
    };
    checkSession();
  }, [setAuth]);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const user = await getUserById(userId);
        setProfileUser(user);
      } catch (error) {
        console.error('Error fetching user by ID:', error);
      }
    };

    if (userId !== 0) {
      fetchUserById();
    }
  }, [userId]);

  return (
    <div className='bg-black'>
      <Banner />
      {profileUser ? (
        <PhotoFollowerAndSubjects
          followers={profileUser.userFollowers}
          subjects={profileUser.userSubjects}
          profilePhoto={profileUser.userProfileImage}
          profileName={profileUser.userName}
        />
      ) : (
        <Oval />
      )}
      {profileUser?
        <ProfileBody user={profileUser} />
        :<Oval/>
      }
    </div>
  );
};
