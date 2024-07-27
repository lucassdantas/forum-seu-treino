import React, { useEffect } from 'react';
import Header from '@/components/Header';
import axios from 'axios';
import { Footer } from '@/components/Footer';
import { User } from '@/api/users/user';
import { currentUserContext } from '@/api/users/currentUserContext';
type MainComponentProps = {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  Component: React.ElementType;
  currentUser:User;
  setCurrentUser:React.Dispatch<React.SetStateAction<User | undefined>> 
}

export const MainComponent = ({ setAuth, Component, currentUser, setCurrentUser }: MainComponentProps) => {

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost/backend/checkSession.php', { withCredentials: true });
        if (!response.data.loggedIn) {
          setAuth(false);
        }else{
          setCurrentUser(response.data.userData)
        }
      } catch (error) {
        console.error('There was an error checking the session!', error);
      }
    };

    checkSession();
  }, [setAuth]);



  return (
    <currentUserContext.Provider value={currentUser}>
      {}
      <Header />
      <main>
        <Component/>
      </main>
      <Footer />
    </currentUserContext.Provider>
  );
};
