import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import axios from 'axios';
import { Banner } from '@/components/common/Banner';
import { PhotoFollowerAndSubjects } from '@/components/common/PhotoFollowerAndSubjects';
import { currentUserContext } from '@/api/users/currentUserContext';
import { ProfileConfigurationsBody } from '@/pages/ProfileConfigurations/ProfileConfigurationsBody';
type SetAuthType = Dispatch<SetStateAction<boolean>>;

interface FeedProps{
    setAuth:SetAuthType;
}
const ProfileConfigurations = ({ setAuth }:FeedProps) => {
  const currentUser = useContext(currentUserContext)
  
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

  return (
    <>
      <Banner/>
      <PhotoFollowerAndSubjects followers={currentUser.userFollowers} subjects={currentUser.userSubjects} profilePhoto={currentUser.userProfileImage} profileName={currentUser.userName}/>
      <ProfileConfigurationsBody user={currentUser}/>
    </>
  );
};

export default ProfileConfigurations;