import { useState, useEffect, useContext } from 'react';
import { currentUserContext } from '@/api/users/currentUserContext';
import { Limiter } from '@/components/common/Limiter';
import React from 'react';
import { getUserRoutines } from '@/api/routines/getuserRoutines';

type Routine = {
  routineId: number;
  routineDescription: string;
  routineDateOfExecute: string;
  routineDateOfCreation: string;
};

export const TrainRoutineBody = () => {
  const currentUser = useContext(currentUserContext);
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      if (currentUser) {
        const fetchedRoutines = await getUserRoutines(currentUser.userId);
        setRoutines(fetchedRoutines);
      }
    };

    fetchRoutines();
  }, [currentUser]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className='bg-black w-full flex justify-center pb-4 xl:px-0 px-4'>
      <Limiter>
        <div className='flex flex-col gap-4 pt-4'>
          <table className='min-w-full bg-gray-800 border border-gray-700 rounded-lg'>
            <thead>
              <tr className='bg-gray-700'>
                <th className='px-6 py-3 text-left text-white'>Descrição</th>
                <th className='px-6 py-3 text-left text-white'>Data para Executar</th>
                <th className='px-6 py-3 text-left text-white'>Data de Criação</th>
              </tr>
            </thead>
            <tbody>
              {routines.length > 0 ? (
                routines.map(routine => (
                  <tr key={routine.routineId} className='border-b border-gray-600'>
                    <td className='px-6 py-4 text-gray-300'>{routine.routineDescription}</td>
                    <td className='px-6 py-4 text-gray-300'>{formatDate(routine.routineDateOfExecute)}</td>
                    <td className='px-6 py-4 text-gray-300'>{formatDate(routine.routineDateOfCreation)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className='px-6 py-4 text-center text-gray-400'>
                    Nenhuma rotina encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Limiter>
    </div>
  );
};
