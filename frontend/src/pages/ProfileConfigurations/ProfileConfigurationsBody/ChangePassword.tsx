import React, { useState } from 'react';

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas novas não coincidem.');
      return;
    }

    // Adicione aqui a lógica para enviar os dados para o servidor
    // Exemplo: await changePassword(oldPassword, newPassword);

    setError('');
    alert('Senha alterada com sucesso!');
  };

  return (
    <div>
      <h3 className='text-xl font-bold mb-4'>Trocar Senha</h3>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
          <label htmlFor='oldPassword' className='block text-sm font-medium'>Senha Antiga</label>
          <input
            type='password'
            id='oldPassword'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
            required
          />
        </div>
        <div>
          <label htmlFor='newPassword' className='block text-sm font-medium'>Nova Senha</label>
          <input
            type='password'
            id='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
            required
          />
        </div>
        <div>
          <label htmlFor='confirmPassword' className='block text-sm font-medium'>Confirmar Nova Senha</label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
            required
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <button
          type='submit'
          className='bg-yellow-seu-treino text-white py-2 px-4 rounded-md'
        >
          Alterar Senha
        </button>
      </form>
    </div>
  );
};