import React from 'react';
import { Link } from 'react-router-dom';
import { Limiter } from '@/components/common/Limiter';
import logo from '@/assets/logo-seu-treino-linha-branca-breno-silva.png';
import { Button } from '@/components/common/Button';
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
  return (
    <header className='bg-black text-white flex justify-center'>
      <Limiter>
        <nav className='flex w-full gap-4 items-center my-4'>
          <div className='w-2/12 text-left'>
            <Link to='/'> <img src={logo} alt='Logo' className='w-full'/></Link>
          </div>
          <div className='w-5/12'>
            <ul className='flex gap-4 items-center justify-center w-full'>
              <li><Link to="/">Login</Link></li>
              <li><Link to="/feed">Feed</Link></li>
            </ul>
          </div>
          <div className='w-5/12'>
            <Button>Visualizar rotina</Button>
          </div>
          <div className='w-3/12'>
            <ul className='flex gap-4'>
              <li>Pesuisar</li>
              <li>Pesuisar</li>
              <li>Pesuisar</li>
              <li>Pesuisar</li>
            </ul>
          </div>
          <div className='w-3/12'>
            <div className="flex">
              <img src={''} alt='Foto do usuário'/>
              <span>Olá, nome</span>
              <FaAngleDown className='text-yellow-seu-treino'/>
            </div>
          </div>

        </nav>
      </Limiter>
    </header>
  );
};

export default Header;
