import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Limiter } from '@/components/common/Limiter';
import { Button } from '@/components/common/Button';
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import logo from '@/assets/logo-seu-treino-linha-branca-breno-silva.png';
import { FaSearch } from "react-icons/fa";
import { PiUserPlus } from "react-icons/pi";
import { FaRegEnvelope, FaRegBell } from "react-icons/fa6";
import { handleLogout } from '@/utils/handleLogout';
import { currentUser } from '@/api/users/currentUser';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstName = currentUser.name.split(' ')[0]

  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <header className='bg-black text-white flex justify-center px-4'>
        <Limiter>
          <div className='bg-black text-white flex justify-between items-center lg:px-0 px-4 py-2 w-full'>
            <div className='flex gap-4 w-full justify-end'>
              <FaSearch className='text-yellow-seu-treino text-xl cursor-pointer' />
              <PiUserPlus className='text-yellow-seu-treino text-xl cursor-pointer' />
              <FaRegEnvelope className='text-yellow-seu-treino text-xl cursor-pointer' />
              <FaRegBell className='text-yellow-seu-treino text-xl cursor-pointer' />
            </div>
          </div>
          <nav className='flex w-full items-center my-4'>
            <div className='w-4/12 lg:w-2/12 text-left'>
              <Link to='/'> <img src={logo} alt='Logo' className='w-full' /></Link>
            </div>
            <div className='hidden md:flex w-8/12 justify-end'>
              <ul className='flex gap-4 items-center '>
                <li><Link to="/">Feed</Link></li>
                <li><Link to={"/perfil?id=" + currentUser.userId}>Meu perfil</Link></li>
                <li><Link to={"/seguidores?id=" + currentUser.userId}>Seguidores</Link></li>
                <li><Link to={"/feed?id=" + currentUser.userId}>Configurações</Link></li>
                <li>
                  <Link to={'/rotina:' + currentUser.userId}>
                    <Button>Visualizar rotina</Button>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='md:w-2/12 w-4/12 flex md:justify-end justify-start items-center gap-4 ml-auto'>
              <div className="flex justify-center items-center gap-4">
                <img src={currentUser.image} alt='Foto' className='rounded-full w-[50px]' />
                <div className="relative flex items-center gap-1">
                  <span>Olá, {firstName}</span>
                  <FaAngleDown
                    className='text-yellow-seu-treino cursor-pointer'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                  />
                  {
                    isMenuOpen &&
                    <div className='absolute top-0 mt-4 bg-black rounded-md'
                      onMouseEnter={() => setIsMenuOpen(true)}
                      onMouseLeave={() => setIsMenuOpen(false)}
                    >
                      <nav className='flex flex-col py-4'>
                        <Link to='seguidores' className='hover:bg-neutral-700 px-4 py-2'>Seguidores</Link>
                        <Link to='configuracoes' className='hover:bg-neutral-700 px-4 py-2'>Configurações da conta</Link>
                        <span onClick={() => handleLogout()} className='hover:bg-neutral-700 px-4 py-2 cursor-pointer'>Sair</span>
                      </nav>
                    </div>
                  }
                </div>
              </div>
              <button
                className="md:hidden text-yellow-seu-treino"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            {isMobileMenuOpen && (
              <div ref={menuRef} className={`fixed top-16 left-0 w-full bg-black text-white z-50 md:hidden`}>
                <div className="flex justify-between items-center px-4 py-2">
                  <button
                    className="text-yellow-seu-treino"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
                <ul className='flex flex-col items-center py-4'>
                  <li className='py-2'><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Feed</Link></li>
                  <li className='py-2'><Link to={"/perfil:" + currentUser.userId} onClick={() => setIsMobileMenuOpen(false)}>Meu perfil</Link></li>
                  <li className='py-2'><Link to={"/seguidores:" + currentUser.userId} onClick={() => setIsMobileMenuOpen(false)}>Seguidores</Link></li>
                  <li className='py-2'><Link to={"/feed:" + currentUser.userId} onClick={() => setIsMobileMenuOpen(false)}>Configurações</Link></li>
                  <li className='py-2'>
                    <Link to={'/rotina:' + currentUser.userId} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button>Visualizar rotina</Button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </Limiter>
      </header>
    </>
  );
};

export default Header;
