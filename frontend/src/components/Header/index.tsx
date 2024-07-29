import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Limiter } from '@/components/common/Limiter';
import { Button } from '@/components/common/Button';
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import logo from '@/assets/logo-seu-treino-linha-branca-breno-silva.png';
import { FaSearch } from "react-icons/fa";
import { PiUserPlus } from "react-icons/pi";
import { FaRegEnvelope, FaRegBell } from "react-icons/fa6";
import { handleLogout } from '@/utils/handleLogout';
import { currentUserContext } from '@/api/users/currentUserContext';
import { UserImage } from '@/components/UserImage';

const Header = () => {
  const currentUser = useContext(currentUserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const firstName = currentUser.userName.split(' ')[0]

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
        
          <nav className='flex w-full items-center my-4'>
            <div className='w-4/12 lg:w-2/12 text-left'>
              <Link to='/'> <img src={logo} alt='Logo' className='w-full' /></Link>
            </div>
            <div className='hidden md:flex w-8/12 justify-end'>
              <ul className='flex gap-4 items-center '>
                <li><Link to="/">Feed</Link></li>
                <li><Link to={"/perfil?id=" + currentUser.userId}>Meu perfil</Link></li>
                <li><Link to={"/usuarios?id=" + currentUser.userId}>Usuários</Link></li>
                <li><Link to={"/configuracoes"}>Configurações</Link></li>
                <li>
                  <Link to={'/rotina'}>
                    <Button>Visualizar rotina</Button>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='md:w-2/12 w-4/12 flex md:justify-end justify-start items-center gap-4 ml-auto'>
              <div className="flex justify-center items-center gap-4">
                <UserImage userId={currentUser.userId}/>
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
                    <div className='absolute top-0 mt-4 bg-black rounded-md min-w-[150px]'
                      onMouseEnter={() => setIsMenuOpen(true)}
                      onMouseLeave={() => setIsMenuOpen(false)}
                    >
                      <nav className='flex flex-col py-4 '>
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
                  <li className='py-2'><Link to={"/usuarios:" + currentUser.userId} onClick={() => setIsMobileMenuOpen(false)}>Usuários</Link></li>
                  <li className='py-2'><Link to={"/feed:" + currentUser.userId} onClick={() => setIsMobileMenuOpen(false)}>Configurações</Link></li>
                  <li className='py-2'>
                    <Link to={'/rotina'} onClick={() => setIsMobileMenuOpen(false)}>
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
