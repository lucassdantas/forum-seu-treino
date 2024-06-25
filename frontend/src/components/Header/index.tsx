import React from 'react';
import { Link } from 'react-router-dom';
import { Limiter } from '@/components/common/Limiter';
import logo from '@/assets/logo-seu-treino-linha-branca-breno-silva.png';

const Header = () => {
  return (
    <header className='bg-black text-white'>
      <Limiter>
        <nav className='flex w-full gap-4'>
          <div>
            <img src={logo} alt='Logo' className='w-[50%]'/>
          </div>
          <div>
            <ul>
              <li><Link to="/">Login</Link></li>
              <li><Link to="/feed">Feed</Link></li>
            </ul>
          </div>
          <div>
            
          </div>
          <div></div>
          <div></div>

        </nav>
      </Limiter>
    </header>
  );
};

export default Header;
