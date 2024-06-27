import React from 'react';
import { Link } from 'react-router-dom';
import { Limiter } from '@/components/common/Limiter';
import { Button } from '@/components/common/Button';
import { FaAngleDown } from "react-icons/fa";
import logo from '@/assets/logo-seu-treino-linha-branca-breno-silva.png';
import tempImgBrenoSilva from '@/assets/personal-trainer-breno-silva-1.jpg';

const Header = () => {
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
            <ul className='flex gap-4 w-full justify-center'>
              <li>Pesuisar</li>
              <li>Pesuisar</li>
              <li>Pesuisar</li>
              <li>Pesuisar</li>
            </ul>
          </div>
          <div className='w-2/12'>
            <div className="flex justify-center items-center gap-4">
              <img src={tempImgBrenoSilva} alt='Foto' className='rounded-full w-[50px]'/>
              <div className="flex">
                <span> Olá, nome</span>
                <FaAngleDown className='text-yellow-seu-treino cursor-pointer '/>
              </div>
            </div>
          </div>

        </nav>
      </Limiter>
    </header>
  );
};

export default Header;
