import { useEffect, useState } from 'react';
import axios from 'axios';
import { Limiter } from '../../components/common/Limiter';
import { MdOutlineEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/currentUserContext';  // Importando o contexto
import logo from '@/assets/logo-seu-treino-linha-branca-breno-silva.png';
import { BACKEND_URL } from '@/constants';
import { toast } from 'react-toastify';

const Login = ({ setAuth }: any) => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser(); // Usando o contexto do usuário

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}checkSession.php`, { withCredentials: true });
        setAuth(response.data.loggedIn);
        setCurrentUser(response.data.userData);
        if(response.data.loggedIn) navigate('/')
      } catch (error) {
        console.error('There was an error checking the session!', error);
      }
    };

    checkSession();
  }, [setCurrentUser]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}login.php`, { username, password }, { withCredentials: true });
      if (response.data.success) {
        setAuth(response.data.success);
        setCurrentUser(response.data.userData); // Configurando o usuário no contexto
        navigate('/'); // Redirecionando após login bem-sucedido
      } else {
        toast.error('Login falhou. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao fazer login!', error);
    }
  };

  return (
    <main className='bg-black text-white w-full py-4 h-screen flex items-center justify-center'>
      <Limiter>
        <div className="flex lg:flex-row flex-col justify-center items-center w-full gap-4">
          <div className="lg:flex flex-col w-1/2 lg:relative hidden items-center">
            <img src={logo} alt='Imagem para login' />
          </div>

          <div className="flex flex-col lg:w-1/2 w-full gap-8 lg:px-4 px-8 lg:text-left text-center">
            <div className="w-full flex lg:justify-start justify-center">
              <img src={logo} alt='Logo' className='w-1/2' />
            </div>
            <p className='text-lg'>Obtenha acesso exclusivo ao Seu Treino</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <fieldset className='flex flex-col gap-4 mb-8'>
                <div className='flex items-center gap-2 border-b-2 border-b-orange-seu-treino'>
                  <MdOutlineEmail />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='bg-transparent py-2 w-full outline-none'
                  />
                </div>
                <div className='flex items-center gap-2 border-b-2 border-b-orange-seu-treino'>
                  <IoMdKey />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='bg-transparent py-2 w-full outline-none'
                  />
                </div>
              </fieldset>
              <button type="submit" className='bg-orange-seu-treino rounded-lg text-center text-black px-12 py-2 hover:bg-yellow-seu-treino transition-colors font-semibold'>Login</button>
            </form>
          </div>
        </div>
      </Limiter>
    </main>
  );
};

export default Login;
