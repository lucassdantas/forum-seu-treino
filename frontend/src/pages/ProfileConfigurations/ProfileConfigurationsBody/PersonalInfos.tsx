import { currentUserContext } from '@/api/users/currentUserContext';
import { Button } from '@/components/common/Button';
import { BACKEND_URL } from '@/constants';
import axios from 'axios';
import React, { useState, useContext } from 'react';

export const PersonalInfos = () => {
  const currentUser = useContext(currentUserContext);
  const [userName, setUserName] = useState(currentUser.userName);
  const [userBirthday, setUserBirthday] = useState(currentUser.userBirthday);
  const [userEmail, setUserEmail] = useState(currentUser.userEmail);
  const [userPhone, setUserPhone] = useState(currentUser.userPhone);

  const handleSave = async () => {
    try {
      const updatedUser = {
        userId: currentUser.userId,
        userName,
        userBirthday,
        userEmail,
        userPhone
      };

      const response = await axios.put(`${BACKEND_URL}controllers/userController.php`, updatedUser, { withCredentials: true });
      
      if (response.data.success) {
//        setCurrentUser(response.data.user);
        alert('Informações atualizadas com sucesso!');
      } else {
        alert('Falha ao atualizar informações!');
      }
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      alert('Erro ao atualizar informações!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h3 className='text-xl font-bold mb-8'>Configurações do Perfil</h3>
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
      </div>
      <div className="flex justify-end mt-4">
        <Button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handleSave}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
};
