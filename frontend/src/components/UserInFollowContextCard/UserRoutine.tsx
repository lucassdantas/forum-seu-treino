import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Routines } from '@/types/routines';
import { formatRoutineDate } from '@/utils/formatRoutineDate';
import { BsTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import { updateRoutine } from '@/api/routines/updateRoutine';
import { deleteRoutine } from '@/api/routines/deleteRoutine';
import { createRoutine } from '@/api/routines/createRoutine'; // Importe a função de criação
import { User } from '@/types/user';

type UserRoutineProps = {
  routines: Routines[] | undefined;
  setRoutines: (routines: Routines[]) => void;
  selectedUser:User;
};

export const UserRoutine = ({ routines, setRoutines, selectedUser }: UserRoutineProps) => {
  const [editingRoutine, setEditingRoutine] = useState<Routines | null>(null);
  const [editedRoutine, setEditedRoutine] = useState<Omit<Routines, 'routineId' | 'routineDateOfCreation'>>({
    routineUserId: 0,
    routineDescription: '',
    routineDateToExecute: '',
  });

  const [showAddRoutine, setShowAddRoutine] = useState<boolean>(false);

  const handleUpdateRoutine = (routine: Routines) => {
    setEditingRoutine(routine);
    setEditedRoutine({
      routineUserId: routine.routineUserId,
      routineDescription: routine.routineDescription,
      routineDateToExecute: routine.routineDateToExecute.slice(0, 10),
    });
  };

  const handleSaveUpdate = async () => {
    if (editingRoutine) {
      const updatedRoutine = { 
        ...editingRoutine, 
        ...editedRoutine,
        routineDateOfCreation: editingRoutine.routineDateOfCreation
      };

      const result = await updateRoutine(updatedRoutine);

      if (result) {
        const updatedRoutines = routines?.map(routine =>
          routine.routineId === editingRoutine.routineId
            ? { ...updatedRoutine }
            : routine
        );
        setRoutines(updatedRoutines || []);
        setEditingRoutine(null);
        setEditedRoutine({ routineUserId: 0, routineDescription: '', routineDateToExecute: '' });
      } else {
        // Handle error
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingRoutine(null);
    setEditedRoutine({ routineUserId: 0, routineDescription: '', routineDateToExecute: '' });
  };

  const handleDeleteRoutine = async (id: number) => {
    try {
      const result = await deleteRoutine(id);

      if (result) {
        const filteredRoutines = routines?.filter(routine => routine.routineId !== id);
        setRoutines(filteredRoutines || []);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  const handleAddRoutine = async () => {
    const newRoutine = {
      routineId: 0, 
      ...editedRoutine,
      routineUserId:selectedUser.userId,
      routineDateOfCreation: new Date().toISOString()
    };

    const result = await createRoutine(newRoutine);

    if (result) {
      setRoutines([...routines || [], result]);
      setShowAddRoutine(false);
      setEditedRoutine({ routineUserId: 0, routineDescription: '', routineDateToExecute: '' });
    } else {
      // Handle error
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-between items-center my-4">
        <h2 className='font-bold'>Rotinas do usuário</h2>
        <Button onClick={() => setShowAddRoutine(true)}>
          Adicionar rotina
        </Button>
      </div>

      {showAddRoutine && (
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-2">Adicionar Nova Rotina</h3>
          <input
            type="text"
            placeholder="Descrição"
            value={editedRoutine.routineDescription}
            onChange={(e) => setEditedRoutine({ ...editedRoutine, routineDescription: e.target.value })}
            className='bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white mb-2 w-full'
          />
          <input
            type="date"
            value={editedRoutine.routineDateToExecute}
            onChange={(e) => setEditedRoutine({ ...editedRoutine, routineDateToExecute: e.target.value })}
            className='bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white mb-2 w-full'
          />
          <div className="flex gap-4 mt-4">
            <Button onClick={handleAddRoutine}>Salvar</Button>
            <Button onClick={() => setShowAddRoutine(false)} className="ml-2">Cancelar</Button>

          </div>
        </div>
      )}

      <table className='min-w-full bg-gray-800 border border-gray-700 rounded-lg'>
        <thead>
          <tr className='bg-gray-700'>
            <th className='px-6 py-3 text-left text-white'>Descrição</th>
            <th className='px-2 py-3 text-left text-white'>Data para Executar</th>
            <th className='px-2 py-3 text-left text-white'>Data de Criação</th>
            <th className='px-2 py-3 text-left text-white'>Controles</th>
          </tr>
        </thead>
        <tbody>
          {routines && routines.length > 0 ? (
            routines.map((routine: Routines) => (
              <tr key={routine.routineId} className='border-b border-gray-600'>
                <td className='px-6 py-4 text-gray-300'>
                  {editingRoutine && editingRoutine.routineId === routine.routineId ? (
                    <input
                      type="text"
                      value={editedRoutine.routineDescription}
                      onChange={(e) => setEditedRoutine({ ...editedRoutine, routineDescription: e.target.value })}
                      className='bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white'
                    />
                  ) : (
                    routine.routineDescription
                  )}
                </td>
                <td className='px-2 py-4 text-gray-300'>
                  {editingRoutine && editingRoutine.routineId === routine.routineId ? (
                    <input
                      type="date"
                      value={editedRoutine.routineDateToExecute}
                      onChange={(e) => setEditedRoutine({ ...editedRoutine, routineDateToExecute: e.target.value })}
                      className='bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white'
                    />
                  ) : (
                    formatRoutineDate(routine.routineDateToExecute)
                  )}
                </td>
                <td className='px-2 py-4 text-gray-300'>
                  {formatRoutineDate(routine.routineDateOfCreation)}
                </td>
                <td className='px-2 py-4 text-gray-300 flex gap-4'>
                  {editingRoutine && editingRoutine.routineId === routine.routineId ? (
                    <>
                      <Button onClick={handleSaveUpdate}>Salvar</Button>
                      <Button onClick={handleCancelEdit}>Cancelar</Button>
                    </>
                  ) : (
                    <>
                      <BsPencilSquare className='font-bold text-lg cursor-pointer' onClick={() => handleUpdateRoutine(routine)} />
                      <BsTrash3Fill className='font-bold text-lg cursor-pointer' onClick={() => handleDeleteRoutine(routine.routineId)} />
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td key={0} colSpan={4} className='px-6 py-4 text-center text-gray-400'>
                Nenhuma rotina encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};