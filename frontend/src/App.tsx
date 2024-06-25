import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Login from './pages/Login';
import Feed from './pages/Feed';

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
        <Route path="/" element={auth ? <Feed setAuth={setAuth} /> : <Login setAuth={setAuth}/>} />
        <Route path="/feed" element={auth ? <Feed setAuth={setAuth} /> : <Login setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
};

export default App;
