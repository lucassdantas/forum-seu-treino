import { useUser } from '@/context/currentUserContext';
import { Button } from '@/components/common/Button';
import { BACKEND_URL } from '@/constants';
import axios from 'axios';
import { useState } from 'react';
import Login from '@/pages/Login';
import { toast } from 'react-toastify';

export const PersonalInfos = () => {
  const { currentUser, setCurrentUser } = useUser();

  if (!currentUser) return <Login />;

  const [userName, setUserName] = useState(currentUser.userName);
  const [userBirthday, setUserBirthday] = useState(currentUser.userBirthday);
  const [userEmail, setUserEmail] = useState(currentUser.userEmail);
  const [userPhone, setUserPhone] = useState(currentUser.userPhone);
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        ...(userPassword && userPassword !== '' && { userPassword }) // Apenas adiciona a senha se ela não for vazia
      };

      const response = await axios.put(`${BACKEND_URL}controllers/userController.php`, updatedUser, { withCredentials: true });
      console.log(response);
      if (response.data.success) {
        // Atualizando o contexto do usuário
        setCurrentUser(response.data.updatedUser);
        toast.success('Informações atualizadas com sucesso!');
      } else {
        toast.error('Falha ao atualizar informações!');
      }
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      toast.error('Erro ao atualizar informações!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h3 className="text-xl font-bold mb-8">Configurações do Perfil</h3>
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
            onChange={(e) => setUserEmail(e.target.value)}
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
