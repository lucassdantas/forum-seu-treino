import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import axios from 'axios';
import { Banner } from '@/components/common/Banner';
import { PhotoFollowerAndSubjects } from '@/components/common/PhotoFollowerAndSubjects';
import { FeedBody } from '@/pages/Feed/FeedBody';
import { useUser } from '@/context/currentUserContext';
import { BACKEND_URL } from '@/constants';
import Login from '@/pages/Login';
import { checkUserRole } from '@/utils/checkUserRole';
type SetAuthType = Dispatch<SetStateAction<boolean>>;

interface FeedProps{
    setAuth:SetAuthType;
}
const Feed = ({ setAuth }:FeedProps) => {
  const {currentUser} = useUser()
  if(!currentUser) return <Login/>
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}checkSession.php`, { withCredentials: true });
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
      <PhotoFollowerAndSubjects profileOwner={currentUser} profileName={currentUser.userName} userRole={checkUserRole(currentUser.userRole)}/>
      <FeedBody/>
    </>
  );
};

export default Feed;
