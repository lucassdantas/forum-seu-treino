import React, { useState } from 'react';
import axios from 'axios';
import { Limiter } from '../../components/common/Limiter';
import { MdOutlineEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";

const Login = ({ setAuth }:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/backend/login.php', { username, password }, { withCredentials: true });
      if (response.data.success) {
        setAuth(true);
        console.log(response)
      } else {
        alert('Login failed'+JSON.stringify(response));
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <main className='bg-black text-white w-full py-4 h-screen pt-[20%]'>
      <Limiter>
        <div className="flex justify-center items-center w-full gap-4">
          <div className="flex flex-col w-1/2 items-center">
            <img src={''} alt='Imagem para login'/>
          </div>
          <div className="flex flex-col w-1/2 gap-8 px-4">
            <img src={''} alt='Logo'/>
            <p className='text-lg'>Obtenha acesso exclusivo ao Seu Treino</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <fieldset className='flex flex-col gap-4 mb-8'>
                <div>
                  <MdOutlineEmail />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='bg-transparent border-b-2 border-b-orange-seu-treino py-2 w-full'
                  />
                </div>
                <div>
                  <IoMdKey />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='bg-transparent border-b-2 border-b-orange-seu-treino py-2 w-full'
                  />
                </div>
              </fieldset>
              <button type="submit" className='bg-yellow-600 rounded-full text-center text-black px-12 py-2 hover:bg-yellow-seu-treino transition-colors font-semibold'>Login</button>
            </form>
              <p className='cursor-pointer text-center text-sm'>Esqueceu sua senha?</p>
          </div>
        </div>

      </Limiter>
    </main>
  );
};

export default Login;
