import { currentUserContext } from '@/api/users/currentUserContext';
import React, { useState, useEffect, useContext } from 'react';

export const PersonalInfos = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const user = currentUser
  const [fullName, setFullName] = useState(user.userName);
  const [birthday, setBirthday] = useState(user.userBirthday);
  const [email, setEmail] = useState(user.userEmail);
  const [phone, setPhone] = useState(user.userPhone);

  useEffect(() => {
    setFullName(user.userName);
    setBirthday(user.userBirthday);
    setEmail(user.userEmail);
    setPhone(user.userPhone);
  }, [user]);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      userName: fullName,
      userBirthday: birthday,
      userEmail: email,
      userPhone: phone,
    };
    setCurrentUser(updatedUser);
    // Você pode adicionar aqui uma chamada para uma API para salvar os dados no backend
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Aniversário:</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Endereço de Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Número de Telefone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};
