import { useUser } from '@/context/currentUserContext';
import { Button } from '@/components/common/Button';
import { BACKEND_URL, DEFAULT_IMAGE_DIRECTORY, SITE_URL } from '@/constants';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import Login from '@/pages/Login';
import { toast } from 'react-toastify';
import { uploadProfileImage } from '@/api/users/uploadProfileImage';
import { FaPen, FaTimes } from 'react-icons/fa';

export const PersonalInfos = () => {
  const { currentUser, setCurrentUser } = useUser();

  if (!currentUser) return <Login />;

  const [userName, setUserName] = useState(currentUser.userName);
  const [userBirthday, setUserBirthday] = useState(currentUser.userBirthday);
  const [userEmail, setUserEmail] = useState(currentUser.userEmail);
  const [userPhone, setUserPhone] = useState(currentUser.userPhone);
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Limpar URL temporária quando o componente for desmontado
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleSave = async () => {
    if (userPassword !== confirmPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }

    try {
      const updatedUser = {
        userId: currentUser.userId,
        userName,
        userBirthday,
        userEmail,
        userPhone,
        ...(userPassword && userPassword !== '' && { userPassword }),
        userHasImage: !!profileImage || currentUser.userHasImage // Atualiza o campo userHasImage
      };
      const response = await axios.put(`${BACKEND_URL}controllers/userController.php`, updatedUser, { withCredentials: true });
      
      if (response.data.success) {
        let imageUploadSuccess = true;

        if (profileImage) {
          imageUploadSuccess = await uploadProfileImage(currentUser.userId, profileImage);
        }

        if (!imageUploadSuccess) {
          toast.error('Falha ao atualizar a foto do perfil!');
          return;
        }

        // Atualizando o contexto do usuário
        setCurrentUser({...response.data.updatedUser, userId:currentUser.userId});
        toast.success('Informações atualizadas com sucesso!');
        handleClearImage()
        location.href='/'
      } else {
        toast.error('Falha ao atualizar informações!');
      }
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      toast.error('Erro ao atualizar informações!');
    }
  };

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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h3 className="text-xl font-bold mb-8">Configurações do Perfil</h3>
      <div className="col-span-2 flex items-center space-x-4 mb-4">
        <div className="relative">
          {previewImage ? (
            <>
              <img
                src={previewImage}
                alt="Pré-visualização"
                className="w-24 h-24 rounded-full object-cover"
              />
              <FaTimes
                className="absolute top-0 right-0 cursor-pointer text-white bg-red-600 rounded-full p-1 text-xl"
                onClick={handleClearImage}
              />
            </>
          ) : currentUser.userHasImage ? (
            <img
              src={`${location.protocol+'//'+ SITE_URL + DEFAULT_IMAGE_DIRECTORY}/${currentUser.userId}/${currentUser.userId}.jpg`}
              alt="Foto de Perfil"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center text-white">
              Enviar foto
            </div>
          )}
          <FaPen
            className={`absolute bottom-0 right-0 cursor-pointer text-white bg-gray-700 rounded-full p-1 text-xl ${isImageSelected ? 'hidden' : ''}`}
            onClick={handleEditClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white">Nome</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white">Aniversário</label>
          <input
            type="date"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userBirthday}
            onChange={(e) => setUserBirthday(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white">E-mail</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userEmail}
            disabled
          />
        </div>
        <div>
          <label className="block text-white">Telefone</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white">Nova Senha</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white">Confirmar Nova Senha</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button className="p-2 bg-blue-500 text-white rounded" onClick={handleSave}>
          Salvar
        </Button>
      </div>
    </div>
  );
};