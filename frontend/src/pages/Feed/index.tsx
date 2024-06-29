import { useEffect } from 'react';
import axios from 'axios';
import { Banner } from '@/components/common/Banner';
import { PhotoFollowerAndSubjects } from '@/components/common/PhotoFollowerAndSubjects';
import profilePhoto from '@/assets/profile/profilePhoto.png'
import { FeedBody } from '@/components/FeedBody';

const Feed = ({ setAuth }:any) => {
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

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost/backend/logout.php', {}, { withCredentials: true });
      if (response.data.success) {
        setAuth(false);
      }
    } catch (error) {
      console.error('There was an error logging out!', error);
    }
  };

  return (
    <>
      <Banner/>
      <PhotoFollowerAndSubjects followers='67' subjects='40' profilePhoto={profilePhoto} profileName='Arthur Nunes'/>
      <FeedBody/>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Feed;
