import React, { useEffect } from 'react';
import Header from '@/components/Header';
import axios from 'axios';
import { Footer } from '@/components/Footer';
import { useUser } from '@/context/currentUserContext';
import { BACKEND_URL } from '@/constants';

type MainComponentProps = {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  Component: React.ElementType;
}

export const MainComponent = ({ setAuth, Component }: MainComponentProps) => {
  const { currentUser, setCurrentUser } = useUser();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}checkSession.php`, { withCredentials: true });
        if (!response.data.loggedIn) {
          setAuth(false);
        } else {
          setCurrentUser(response.data.userData);
        }
      } catch (error) {
        console.error('There was an error checking the session!', error);
      }
    };

    checkSession();
  }, [setAuth, setCurrentUser]);

  return (
    <>
      <Header />
      <main>
        <Component />
      </main>
      <Footer />
    </>
  );
};
