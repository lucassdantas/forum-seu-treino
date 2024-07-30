import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Login from '@/pages/Login';
import Feed from '@/pages/Feed';
import { MainComponent } from '@/components/MainComponent';
import { Followers } from '@/pages/Followers';
import { Profile } from '@/pages/Profile';
import ProfileConfigurations from '@/pages/ProfileConfigurations';
import TrainRoutine from '@/pages/TrainRoutine';
import { useUser } from '@/context/currentUserContext'; // Importando o contexto
import { BACKEND_URL } from '@/constants';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const { currentUser, setCurrentUser } = useUser(); // Usando o contexto
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}checkSession.php`, { withCredentials: true });
        setAuth(response.data.loggedIn);
        setCurrentUser(response.data.userData);

      } catch (error) {
        console.error('There was an error checking the session!', error);
      }
    };

    checkSession();
  }, [setCurrentUser]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={Feed} />
              : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/feed"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={Feed} />
              : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/usuarios"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={Followers} />
              : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/perfil"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={Profile} />
              : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/configuracoes"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={ProfileConfigurations} />
              : <Login setAuth={setAuth} />
          }
        />
        <Route
          path="/rotina"
          element={
            auth && currentUser !== undefined
              ? <MainComponent setAuth={setAuth} Component={TrainRoutine} />
              : <Login setAuth={setAuth} />
          }
        />
      </Routes>
      <ToastContainer /> {/* Adicione o ToastContainer aqui */}
    </Router>
  );
};

export default App;