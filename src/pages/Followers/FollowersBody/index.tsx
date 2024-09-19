import { useEffect, useState, useRef } from 'react';
import { Limiter } from '@/components/common/Limiter';
import { UserInFollowContextCard } from '@/components/UserInFollowContextCard';
import { IoSearch } from "react-icons/io5";
import { User } from '@/types/user'; // Tipo para os seguidores
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Popup } from '@/components/common/Popup';
import { useUser } from '@/context/currentUserContext';
import { Button } from '@/components/common/Button';
import { toast } from 'react-toastify';
import { FaPen, FaTimes, FaTrash } from 'react-icons/fa';
import { getUsers } from '@/api/users/getUsers';
import { createUser } from '@/api/users/createUser';
import { uploadProfileImage } from '@/api/users/uploadProfileImage';
import { deleteUser } from '@/api/users/deleteUser'; // Importe a função de exclusão
import { FaPencil } from 'react-icons/fa6';
import { updateUser } from '@/api/users/editUser';
import { BACKEND_URL, DEFAULT_IMAGE_DIRECTORY, SITE_URL } from '@/constants';

interface UserData {
  userName: string;
  userEmail: string;
  userPhone: string;
  userBirthday: string;
  userPassword: string;
  userHasImage: boolean;
  userRole:string;
}

export const FollowersBody = () => {
  const { currentUser } = useUser(); // Use o contexto do usuário
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [followers, setFollowers] = useState<User[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userBirthday, setUserBirthday] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setFollowers(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Limpar URL temporária quando o componente for desmontado
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  useEffect(() => {
    // Atualiza a lista de seguidores sempre que o componente for atualizado
    const fetchUsers = async () => {
      const users = await getUsers();
      setFollowers(users);
    };

    fetchUsers();
  }, [isPopupOpen]);

  const filteredFollowers = followers.filter(follower =>
    follower.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!followers) return <LoadingSpinner />;

  const handleAddUserClick = () => {
    setEditingUserId(null);
    setIsPopupOpen(true);
  };
  const handleEditUser = (userId: number) => {
    const userToEdit = followers.find((user) => user.userId === userId);
    if (userToEdit) {
      setEditingUserId(userId); 
      setUserName(userToEdit.userName);
      setUserEmail(userToEdit.userEmail);
      setUserPhone(userToEdit.userPhone);
      setUserBirthday(userToEdit.userBirthday);
      setUserRole(userToEdit.userRole || 'Usuário');
      setUserPassword('');  
      setConfirmPassword('');
      
      // Verifica se o usuário tem uma imagem de perfil
      if (userToEdit.userHasImage) {
        // Define a URL para o preview da imagem existente
        setPreviewImage(`${location.protocol+'//'+ SITE_URL + DEFAULT_IMAGE_DIRECTORY}/${userId}/${userId}.jpg`);
      } else {
        setPreviewImage(null); // Sem imagem
      }
      
      setIsPopupOpen(true);
    }
  };
  

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (userPassword !== confirmPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }
  
    try {
      const newUser: UserData = {
        userName,
        userEmail,
        userPhone,
        userBirthday,
        userPassword,
        userHasImage: !!previewImage,
        userRole,
      };
  
      if (editingUserId) {
        // Atualiza o usuário existente
        const response = await updateUser(editingUserId, newUser);
        if (response.success) {
          // Se uma nova imagem foi selecionada, faça o upload
          if (profileImage) {
            const imageUploadSuccess = await uploadProfileImage(editingUserId, profileImage);
            if (!imageUploadSuccess) {
              toast.error('Falha ao atualizar a foto do perfil!');
              return;
            }
          }
          toast.success('Usuário atualizado com sucesso!');
        } else {
          toast.error('Falha ao atualizar usuário.');
        }
      } else {
        // Cria um novo usuário
        const response = await createUser(newUser);
        if (response.success) {
          if (profileImage) {
            const imageUploadSuccess = await uploadProfileImage(response.userId, profileImage);
            if (!imageUploadSuccess) {
              toast.error('Falha ao adicionar a foto do perfil!');
              return;
            }
          }
          toast.success('Usuário adicionado com sucesso!');
        } else {
          toast.error('Falha ao adicionar usuário.');
        }
      }
  
      handleClosePopup();
      const users = await getUsers();
      setFollowers(users);
    } catch (error) {
      console.error('Erro ao adicionar/atualizar usuário:', error);
      toast.error('Erro ao adicionar/atualizar usuário!');
    }
  };
  
  const resetFields = () => {
    setUserName('')
    setUserEmail('')
    setUserPhone('')
    setUserBirthday('')
    setUserPassword('')
    setConfirmPassword('')
    setProfileImage(null)
    setPreviewImage(null)
    setIsImageSelected(false)
    setEditingUserId(null)
  }
  const handleClosePopup = () => {
    setIsPopupOpen(false)
    resetFields()
  }


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setIsImageSelected(true);
    }
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClearImage = () => {
    setProfileImage(null);
    setPreviewImage(null);
    setIsImageSelected(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Limpa o valor do input file
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await deleteUser(userId);
      if (response.success) {
        setFollowers((prevFollowers) => prevFollowers.filter((user) => user.userId !== userId));
        toast.success('Usuário deletado com sucesso!');
      } else {
        toast.error('Erro ao deletar usuário.');
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      toast.error('Erro ao deletar usuário.');
    }
  };
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(event.target.value);
  };

  return (
    <div className='bg-black w-full flex justify-center px-4'>
      <Limiter>
        <div className='bg-black mt-12'>
          <div className="flex gap-4 items-center">
            <div className='flex border border-neutral-500 focus:border-neutral-200 text-white items-center gap-2 w-64 p-2'>
              <IoSearch className='text-yellow-seu-treino text-lg' />
              <input
                className='bg-transparent outline-none w-full'
                type='text'
                placeholder='Procurar'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {currentUser?.userRole === 'admin' && (
              <Button className='bg-orange-seu-treino text-white items-center' onClick={handleAddUserClick}>
                + Usuário
              </Button>
            )}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
            {!filteredFollowers && <LoadingSpinner />}
            {filteredFollowers.length > 0 && filteredFollowers.map((follower: User, i: number) => {
              if(currentUser && follower.userId == currentUser.userId) return('')
              return(
                <div className="relative" key={i}>
                  {currentUser?.userRole === 'admin' && follower.userId != currentUser.userId && (
                    <>
                      <FaTrash
                        onClick={() => handleDeleteUser(follower.userId)}
                        className='absolute top-2 right-2 text-red-600 cursor-pointer'
                      />
                      <div className='absolute top-2 left-2 rounded-full bg-orange-seu-treino p-2 ' onClick={() => handleEditUser(follower.userId)}>
                        <FaPencil className=' text-white cursor-pointer'/>
                      </div>

                    </>
                  )}
                  <UserInFollowContextCard key={i} user={follower} />
                </div>
              )
            })}
            {filteredFollowers.length === 0 && <span className='text-white'>Nenhum resultado encontrado.</span>}
          </div>
        </div>
      </Limiter>
      <Popup isOpen={isPopupOpen} onClose={() => handleClosePopup()}>
        <form onSubmit={handleFormSubmit} className='p-4 text-white'>
          <div className='flex flex-col gap-4'>
            <input type="file" ref={fileInputRef} accept=".jpg" style={{ display: 'none' }} onChange={handleImageChange} />
            {previewImage ? (
              <div className='relative flex items-start'>
                <img src={previewImage} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full" />
                <button type="button" onClick={handleClearImage} className='p-1 bg-black rounded-full'>
                  <FaTimes className='text-white' />
                </button>
              </div>
            ) : (
              <div className='flex items-center justify-center w-32 h-32 bg-neutral-700 rounded-full'>
                <button type="button" onClick={handleEditClick} className='text-white'>
                  <FaPen />
                </button>
              </div>
            )}
            <input className='bg-neutral-700 p-2 rounded-lg' type='text' placeholder='Nome' required value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input className='bg-neutral-700 p-2 rounded-lg' type='email' placeholder='Email' required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            <input className='bg-neutral-700 p-2 rounded-lg' type='text' placeholder='Telefone' required value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
            <select
              id="userRole"
              value={userRole}
              onChange={handleRoleChange}
              className="bg-neutral-700 p-2 rounded-lg'"
            >
              <option value="Usuário">Usuário</option>
              <option value="Nutricionista">Nutricionista</option>
              <option value="Personal Trainer">Personal Trainer</option>
            </select>
            <input className='bg-neutral-700 p-2 rounded-lg' type='date' placeholder='Aniversário' required value={userBirthday} onChange={(e) => setUserBirthday(e.target.value)} />
            {editingUserId &&<>
              <input className='bg-neutral-700 p-2 rounded-lg' type='password' placeholder='Senha' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
              <input className='bg-neutral-700 p-2 rounded-lg' type='password' placeholder='Confirmar Senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </>
            }
            {!editingUserId &&<>
              <input className='bg-neutral-700 p-2 rounded-lg' type='password' placeholder='Senha' required value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
              <input className='bg-neutral-700 p-2 rounded-lg' type='password' placeholder='Confirmar Senha' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </>
            }
            
            <button type='submit' className='p-4 bg-orange-seu-treino text-white'>
              {editingUserId? 'Atualizar usuário':'Adicionar Usuário'}
            </button>
          </div>
        </form>
      </Popup>
    </div>
  );
};