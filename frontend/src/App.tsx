import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from '@/pages/Login';
import Feed from '@/pages/Feed';
import { MainComponent } from '@/components/MainComponent';
import { Followers } from '@/pages/Followers';
import { User } from '@/api/users/user';
import { Profile } from '@/pages/Profile';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost/backend/checkSession.php', { withCredentials: true });
        setAuth(response.data.loggedIn);
        setCurrentUser(response.data.userData);
        console.log(response.data);
      } catch (error) {
        console.error('There was an error checking the session!', error);
      }
    };

    checkSession();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={Feed} currentUser={currentUser} setCurrentUser={setCurrentUser} />
              : <Login setAuth={setAuth} currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/feed"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={Feed} currentUser={currentUser} setCurrentUser={setCurrentUser} />
              : <Login setAuth={setAuth} currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/seguidores"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={Followers} currentUser={currentUser} setCurrentUser={setCurrentUser} />
              : <Login setAuth={setAuth} currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/perfil"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={Profile} currentUser={currentUser} setCurrentUser={setCurrentUser} />
              : <Login setAuth={setAuth} currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
