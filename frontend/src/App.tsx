import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from '@/pages/Login';
import Feed from '@/pages/Feed';
import { MainComponent } from '@/components/MainComponent';
import { Followers } from '@/pages/Followers';

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost/backend/checkSession.php', { withCredentials: true });
        setAuth(response.data.loggedIn);
      } catch (error) {
        console.error('There was an error checking the session!', error);
      }
    };

    checkSession();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <MainComponent setAuth={setAuth} Component={Feed} /> : <Login setAuth={setAuth}/>} />
        <Route path="/feed" element={auth ? <MainComponent setAuth={setAuth} Component={Feed} /> : <Login setAuth={setAuth} />} />
        <Route path="/seguidores" element={auth ? <MainComponent setAuth={setAuth} Component={Followers} /> : <Login setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
};

export default App;
