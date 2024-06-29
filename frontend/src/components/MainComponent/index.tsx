import React, { useEffect } from 'react';
import Header from '@/components/Header';
import axios from 'axios';
import { Footer } from '@/components/Footer';

type MainComponentProps = {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  Component: React.ElementType;
}

export const MainComponent = ({ setAuth, Component }: MainComponentProps) => {
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
      <Header />
      <main>
        <Component />
      </main>
      <Footer />
    </>
  );
};
