import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Limiter } from '@/components/common/Limiter';
import { Button } from '@/components/common/Button';
import { FaAngleDown } from "react-icons/fa";
import logo from '@/assets/logo-seu-treino-linha-branca-breno-silva.png';
import { FaSearch } from "react-icons/fa";
import { PiUserPlus } from "react-icons/pi";
import { FaRegEnvelope, FaRegBell } from "react-icons/fa6";


import tempImgBrenoSilva from '@/assets/personal-trainer-breno-silva-1.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className='bg-black text-white flex justify-center'>
      <Limiter>
        <nav className='flex w-full gap-4 items-center my-4'>
          <div className='w-2/12 text-left'>
            <Link to='/'> <img src={logo} alt='Logo' className='w-full'/></Link>
          </div>
          <div className='w-4/12'>
            <ul className='flex gap-4 items-center justify-center w-full'>
              <li><Link to="/">Login</Link></li>
              <li><Link to="/feed">Feed</Link></li>
              <li><Link to="/feed">Feed</Link></li>
              <li><Link to="/feed">Feed</Link></li>
              <li><Link to="/feed">Feed</Link></li>
            </ul>
          </div>
          <div className='w-2/12'>
            <Button>Visualizar rotina</Button>
          </div>
          <div className='w-4/12'>
            <ul className='flex gap-8 w-full justify-center'>
              <li><FaSearch  className='text-yellow-seu-treino text-xl cursor-pointer'/></li>
              <li><PiUserPlus className='text-yellow-seu-treino text-xl cursor-pointer'/></li>
              <li><FaRegEnvelope  className='text-yellow-seu-treino text-xl cursor-pointer'/></li>
              <li><FaRegBell  className='text-yellow-seu-treino text-xl cursor-pointer'/></li>
            </ul>
          </div>
          <div className='w-2/12'>
            <div className="flex justify-center items-center gap-4">
              <img src={tempImgBrenoSilva} alt='Foto' className='rounded-full w-[50px]'/>
              <div className="flex">
                {
                  isMenuOpen &&
                  <div className='absolute mt-4 bg-black rounded-md' 
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                  >
                      <nav className='flex flex-col py-4'>
                        <Link to='amigos' className='hover:bg-neutral-700  px-4 py-2'>Amigos</Link>
                        <Link to='configuracoes' className='hover:bg-neutral-700  px-4 py-2'>Configurações da conta</Link>
                      </nav>
                  </div>
                }

                <div className="flex items-center">
                  <span> Olá, nome</span>
                  <FaAngleDown 
                    className='text-yellow-seu-treino cursor-pointer'
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                  />
                </div>

              </div>
            </div>
          </div>

        </nav>
      </Limiter>
    </header>
  );
};

export default Header;
