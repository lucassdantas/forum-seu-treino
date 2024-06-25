import React from 'react';
import { Link } from 'react-router-dom';
import { Limiter } from '@/components/common/Limiter';
import logo from '@/assets/logo-seu-treino-linha-branca-breno-silva.png';
import { Button } from '@/components/common/Button';

const Header = () => {
  return (
    <header className='bg-black text-white'>
      <Limiter>
        <nav className='flex w-full gap-4 items-center'>
          <div className='w-1/6'>
            <img src={logo} alt='Logo' className='w-[50%]'/>
          </div>
          <div className='w-3/6'>
            <ul className='flex gap-4 items-center'>
              <li><Link to="/">Login</Link></li>
              <li><Link to="/feed">Feed</Link></li>
            </ul>
          </div>
          <div className='1/6'>
            <Button>Visualizar rotina</Button>
          </div>
          <div></div>
          <div></div>

        </nav>
      </Limiter>
    </header>
  );
};

export default Header;
