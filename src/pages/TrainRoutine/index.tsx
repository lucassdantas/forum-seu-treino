import { Dispatch, SetStateAction, useEffect } from 'react';
import axios from 'axios';
import { Banner } from '@/components/common/Banner';
import { PhotoFollowerAndSubjects } from '@/components/common/PhotoFollowerAndSubjects';
import { useUser } from '@/context/currentUserContext';

import { TrainRoutineBody } from '@/pages/TrainRoutine/TrainRoutineBody';
import Login from '@/pages/Login';
import { BACKEND_URL } from '@/constants';
import { checkUserRole } from '@/utils/checkUserRole';
type SetAuthType = Dispatch<SetStateAction<boolean>>;

interface FeedProps{
    setAuth:SetAuthType;
}
const TrainRoutine = ({ setAuth }:FeedProps) => {
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
      <PhotoFollowerAndSubjects profileName={currentUser.userName} profileOwner={currentUser} userRole={checkUserRole(currentUser.userRole)}/>
      <TrainRoutineBody />
    </>
  );
};

export default TrainRoutine;
