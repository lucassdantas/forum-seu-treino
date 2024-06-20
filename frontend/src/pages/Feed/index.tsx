import React, { useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Feed</h2>
      <p>Welcome to the feed!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Feed;
