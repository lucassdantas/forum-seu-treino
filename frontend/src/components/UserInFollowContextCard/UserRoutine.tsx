import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Routines } from '@/types/routines';
import { formatRoutineDate } from '@/utils/formatRoutineDate';
import { BsTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import { updateRoutine } from '@/api/routines/updateRoutine';
import { deleteRoutine } from '@/api/routines/deleteRoutine'; // Importe a função de exclusão

type UserRoutineProps = {
  routines: Routines[] | undefined;
  setRoutines: (routines: Routines[]) => void;
};

export const UserRoutine = ({ routines, setRoutines }: UserRoutineProps) => {
  const [editingRoutine, setEditingRoutine] = useState<Routines | null>(null);
  const [editedRoutine, setEditedRoutine] = useState<Omit<Routines, 'routineId' | 'routineDateOfCreation'>>({
    routineUserId: 0,
    routineDescription: '',
    routineDateToExecute: '', // Ajustado para `routineDateToExecute`
  });

  const handleUpdateRoutine = (routine: Routines) => {
    setEditingRoutine(routine);
    setEditedRoutine({
      routineUserId: routine.routineUserId,
      routineDescription: routine.routineDescription,
      routineDateToExecute: routine.routineDateToExecute.slice(0, 10), // Formato YYYY-MM-DD
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
        // Handle error (e.g., show a message to the user)
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingRoutine(null);
    setEditedRoutine({ routineUserId: 0, routineDescription: '', routineDateToExecute: '' });
  };

  const handleDeleteRoutine = async (id: number) => {
    try {
      const result = await deleteRoutine(id); // Passar apenas o ID para a função de exclusão

      if (result) {
        const filteredRoutines = routines?.filter(routine => routine.routineId !== id);
        setRoutines(filteredRoutines || []);
      } else {
        // Handle error (e.g., show a message to the user)
      }
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-between items-center my-4">
        <h2 className='font-bold'>Rotinas do usuário</h2>
        <Button onClick={() => handleUpdateRoutine({ routineId: 0, routineUserId: 0, routineDescription: '', routineDateToExecute: '', routineDateOfCreation: new Date().toISOString() })}>
          Adicionar rotina
        </Button>
      </div>
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
              <td colSpan={4} className='px-6 py-4 text-center text-gray-400'>
                Nenhuma rotina encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
