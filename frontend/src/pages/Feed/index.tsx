import { useEffect } from 'react';
import axios from 'axios';
import { Banner } from '@/components/common/Banner';
import { PhotoFollowerAndSubjects } from '@/components/common/PhotoFollowerAndSubjects';
import profilePhoto from '@/assets/profile/profilePhoto.png'
import { FeedBody } from '@/pages/Feed/FeedBody';
import { currentUser } from '@/api/users/currentUser';

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


  return (
    <>
      <Banner/>
      <PhotoFollowerAndSubjects followers={currentUser.followers} subjects={currentUser.subjects} profilePhoto={currentUser.image} profileName={currentUser.name}/>
      <FeedBody/>
    </>
  );
};

export default Feed;
